/* ******************************************************************************
 * Source of this code is from my own repository: 
 * https://github.com/ARTidas/Research/tree/main/DroneNetworkSimulation_BASE_V1
 * ******************************************************************************/

document.addEventListener("DOMContentLoaded", function(event) {

    // Marker color image source: https://github.com/pointhi/leaflet-color-markers/tree/master/img
    var greenIcon = new L.Icon({
        iconUrl: '/media/icons/marker-icon-2x-green.png',
        shadowUrl: '/media/icons/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var yellowIcon = new L.Icon({
        iconUrl: '/media/icons/marker-icon-yellow.png',
        shadowUrl: '/media/icons/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    var blueIcon = new L.Icon({
        iconUrl: '/media/icons/marker-icon-blue.png',
        shadowUrl: '/media/icons/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // Retrieve weather information
    const weather = new Weather();
    weather.getData()
        .then(data => {
            weather.displayData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    ;

    // Retrieve drone network request records
    // Display markers for request latitude and longitude coordinates
    const droneNetworkRequest = new DroneNetworkRequest();
    droneNetworkRequest.getData()
        .then(records => {
            JSON.parse(records).forEach(function(record) {
                let recordmarker = L.marker(
                    [
                        parseFloat(record.location_latitude),
                        parseFloat(record.location_longitude)
                    ],
                    {icon: yellowIcon}
                );
                recordmarker.bindPopup(`
                    Type: ${record.type}<br/>
                    Location Latitude: ${record.location_latitude}<br/>
                    Location Longitude: ${record.location_longitude}<br/>
                    Description: ${record.description}<br/>
                    Requester Name: ${record.requester_name}<br/>
                    Requester Contact Phone: ${record.requester_contact_phone}<br/>
                    Created At: ${record.created_at}<br/>
                `);
                requestGroup.addLayer(recordmarker);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    ;

    // Retrieve drone records with drone station id
    let drones = [];
    const drone = new Drone();
    drone.getData()
        .then(records => {
            JSON.parse(records).forEach(function(record) {
                drones.push(record);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    ;
    
    // Setup base variables for the Leaflet map
    let center = [48.32136917139583, 21.56666973293446]; // 3950 Sarospatak, Hungary
    const map = L.map('map_full').setView(center, 15);
    let OpenStreetMap = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 18,
            attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ).addTo(map);

    // Set the featuregroups which can be toggled on the Leaflet map
    const voronoiPolygons = L.featureGroup().addTo(map);
    const stationsGroup = new L.FeatureGroup().addTo(map);
    const dronesGroup = new L.FeatureGroup().addTo(map);
    const droneRangesGroup = new L.FeatureGroup().addTo(map);
    const requestGroup = new L.FeatureGroup().addTo(map);

    // Add controls for the Leaflet map to manage layers
    L.control.layers(
        {
            'OSM': OpenStreetMap,
            'Google': L.tileLayer(
                'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                {
                    attribution: 'Google'
                }
            ),
            'HillShade': L.tileLayer.wms(
                'http://ows.mundialis.de/services/service?',
                {
                    layers: 'SRTM30-Hillshade'
                }
            ),
            /*'Colored': L.tileLayer.wms(
                'http://ows.mundialis.de/services/service?',
                {
                    layers: 'TOPO-WMS'
                }
            )*/
        },
        {
            'Stations': stationsGroup,
            'Voronoi': voronoiPolygons,
            'Drones': dronesGroup,
            'Drone ranges': droneRangesGroup,
            'Requests': requestGroup,
        },
        {
            position: 'topleft',
            collapsed: false
        }
    ).addTo(map);

    fetch('https://research.artidas.hu/api/drone_network_simulation/get_stations.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(function(station) {
                let station_marker = L.marker(
                    [
                        parseFloat(station.location_latitude),
                        parseFloat(station.location_longitude)
                    ],
                    {icon: blueIcon}
                );
                station_marker.bindPopup(`
                    <strong>#${station.id} - ${station.name}</strong><br/>
                    Charge Type: ${station.charge_type}<br/>
                    Drone Capacity: ${station.drone_capacity}<br/>
                    Medical Services Available: ${station.is_medical ? 'Yes' : 'No'}<br/>
                    Maintenance Services Available: ${station.is_maintenance ? 'Yes' : 'No'}<br/>
                    Parcel Pickup Available: ${station.is_parcel_pickup ? 'Yes' : 'No'}<br/>
                    Parking Allowed: ${station.is_parking_allowed ? 'Yes' : 'No'}<br/>
                    Weather Proof: ${station.weather_proof ? 'Yes' : 'No'}<br/>
                    Active: ${station.is_active ? 'Yes' : 'No'}
                `);
                stationsGroup.addLayer(station_marker);

                drones.forEach(function(drone) {
                    if (station.id == drone.station_id) {
                        let drone_marker = L.marker(
                            [
                                parseFloat(station.location_latitude) + getRandomCoordinateOffset(),
                                parseFloat(station.location_longitude) + getRandomCoordinateOffset()
                            ],
                            {icon: greenIcon}
                        );
                        drone_marker.bindPopup(`
                            <strong>#${drone.drone_id}</strong><br/>
                            Station id: #${drone.station_id}<br/>
                            Manufaturer: ${drone.drone_manufacturer}<br/>
                            Model: ${drone.drone_model}<br/>
                            Weight (kg): ${drone.drone_weight_kg}<br/>
                            Max speed (km/h): ${drone.drone_max_speed_kmh}<br/>
                            Payload (kg): ${drone.drone_payload_weight_kg}<br/>
                            Range (km): ${drone.drone_range_km}
                        `);
                        dronesGroup.addLayer(drone_marker);

                        drone_range_circle = L.circle(
                            [
                                parseFloat(station.location_latitude) + getRandomCoordinateOffset(),
                                parseFloat(station.location_longitude) + getRandomCoordinateOffset()
                            ],
                            {
                                radius: (drone.drone_range_km * 1000) / 2, // Lets divide by to for safety measurements
                                color: '#0f0',
                                weight: 1,
                                opacity: 0.75,
                                //fillColor: '#00f',
                                fillOpacity: 0,
                            }
                        );
                        droneRangesGroup.addLayer(drone_range_circle);
                    }
                });
            });

            computeVoronoiDiagram();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
    ;

    map.on('draw:created', computeVoronoiDiagram);
    map.on('draw:edited', computeVoronoiDiagram);
    map.on('draw:deleted', computeVoronoiDiagram);

    function computeVoronoiDiagram() {
        console.log('Computing Voronoi diagram...');
        let markers = [];

        stationsGroup.eachLayer(function (layer) {
            markers.push(
                [
                    layer.getLatLng().lat,
                    layer.getLatLng().lng,
                ]
            );
        });

        const voronoi = new Voronoi(markers);
        voronoi.calculateVoronoiPolygons();
        voronoiPolygons.clearLayers();
        voronoi.getVoronoiPolygons().forEach(coordinates => {
            voronoiPolygons.addLayer(
                L.polygon(
                    coordinates,
                    {
                        color: '#00f',
                        weight: 1,
                        opacity: 0.75,
                        //fillColor: '#00f',
                        fillOpacity: 0,
                    }
                )
            )
        });
    }

    function getRandomCoordinateOffset() {
        return getRandomArbitrary(-0.0001, 0.0001);
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

});
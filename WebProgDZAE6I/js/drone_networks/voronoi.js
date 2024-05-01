class Voronoi {

    constructor(markers) {
        this.markers = markers; // List of marker coordinates [[lat, lng], [lat, lng], ...]
        this.voronoiPolygons = [];
    }

    calculateVoronoiPolygons() {
        // Convert markers to Turf.js FeatureCollection
        const turfPoints = {
            type: 'FeatureCollection',
            features: this.markers.map(coord => {
                return {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coord
                    }
                };
            })
        };

        // Calculate Voronoi diagram
        const voronoi = turf.voronoi(turfPoints);

        // Extract Voronoi polygons
        this.voronoiPolygons = voronoi.features.map(feature => {
            //console.log(feature.geometry);
            return feature.geometry.coordinates[0]; // Extract polygon coordinates
        });
    }

    // Function to get calculated Voronoi polygons
    getVoronoiPolygons() {
        return this.voronoiPolygons;
    }
    
}

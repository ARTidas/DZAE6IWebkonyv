class Weather {

    async getData() {
        let myHeaders = new Headers();
        myHeaders.append("X-API-Key", "1bc232a7caac45f68d5fc988d6");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        // Request Kosice (LZKZ) weather data from METAR
        // Or use LHMC for Miskolc ICAO
        try {
            const response = await fetch("https://api.checkwx.com/metar/LZKZ/decoded", requestOptions);
            const result = await response.text();
            
            return result;
        } catch (error) {
            console.log('error', error);
            
            return null;
        }
    }

    displayData(data) {
        const JSONObject = JSON.parse(data);
        const {
            station,
            temperature,
            humidity,
            wind,
            observed,
            barometer,
            clouds,
            dewpoint,
            elevation,
            flight_category,
            visibility,
            raw_text
        } = JSONObject.data[0];


        const divElement = document.createElement('div');

        divElement.style.position = 'absolute';
        divElement.style.zIndex = '1000';
        divElement.style.bottom = '20%';
        divElement.style.left = '1%';
        divElement.style.width = '20%';
        divElement.style.height = '250px';
        divElement.style.padding = '10px';
        divElement.style.fontSize = '14px';
        divElement.style.border = '1px solid #000';
        divElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

        divElement.innerHTML = `
            Station: ${station.name}<br/>
            Location: ${station.location}<br/>
            Temperature: ${temperature.celsius}°C (${temperature.fahrenheit}°F)<br/>
            Humidity: ${humidity.percent}%<br/>
            Wind Speed: ${wind.speed_kph} km/h (${wind.speed_mph} mph)<br/>
            Wind Direction: ${wind.degrees}°<br/>
            Observed: ${observed}<br/>
            Barometer: ${barometer.hg} inHg (${barometer.hpa} hPa)<br/>
            Dewpoint: ${dewpoint.celsius}°C (${dewpoint.fahrenheit}°F)<br/>
            Elevation: ${elevation.feet} ft (${elevation.meters} m)<br/>
            Flight Category: ${flight_category}<br/>
            Visibility: ${visibility.miles} miles (${visibility.meters} meters)<br/>
            Raw Text: ${raw_text}<br/>
            Clouds: ${clouds.map(cloud => cloud.text).join(', ')}<br/>
        `;

        document.body.appendChild(divElement);
    }

}
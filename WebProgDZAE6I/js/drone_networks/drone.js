class Drone {

    async getData() {
        try {
            const response = await fetch("https://research.artidas.hu/api/drone_network_simulation/get_drones_with_station.php");
            const result = await response.text();
            
            return result;
        } catch (error) {
            console.log('error', error);
            
            return null;
        }
    }
    
}

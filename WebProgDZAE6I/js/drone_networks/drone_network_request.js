class DroneNetworkRequest {

    async getData() {
        try {
            const response = await fetch("https://research.artidas.hu/api/drone_network_simulation/get_requests.php");
            const result = await response.text();
            
            return result;
        } catch (error) {
            console.log('error', error);
            
            return null;
        }
    }
    
}
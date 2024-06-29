document.addEventListener("DOMContentLoaded", () => {
    let userLocation = null;

    function updateLocation(position) {
        userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date()
        };
        sendLocationToServer(userLocation);
        // Proceed to load the rest of the page after location is obtained
        document.body.style.display = "block";
    }

    function sendLocationToServer(location) {
        fetch('update_location.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        }).catch(error => console.error('Error:', error));
    }

    function requestLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError, { enableHighAccuracy: true });
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError, { enableHighAccuracy: true });
            }, 10000);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function handleLocationError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation. The page cannot load without location access.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
        document.body.style.display = "none"; // Keep the page hidden if location is not obtained
    }

    // Hide the body initially until location is obtained
    document.body.style.display = "none";
    requestLocation();
});

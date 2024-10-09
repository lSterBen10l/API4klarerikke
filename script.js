const apiKey = 'ed2d5a648ea131cee27d3d6ce4a02d57'; 

function getWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API%20key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("By ikke funnet.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // For debugging: se data fra API-et

            if (data.cod === 200) {
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `Temperatur: ${data.main.temp}°C`;
                document.getElementById('min-max-temp').textContent = `Min: ${data.main.temp_min}°C | Max: ${data.main.temp.max}°C`;
            } else {
                alert("By ikke funnet. Prøv igjen.");
            }
        })
        .catch(error => {
            console.error("API-feil: ", error);
            alert("Noe gikk galt med værdataforespørselen.");
        });
}

// Funksjon for å hente værdata for den nåværende posisjonen
function getWeatherForCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolokasjon støttes ikke av denne nettleseren.");
    }
}

// Suksessfunksjon som kalles hvis geolokasjon er vellykket
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log("Lat: " + lat + ", Lon: " + lon); // For debugging

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("API-forespørsel mislyktes.");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // For debugging: se data fra API-et

            if (data.cod === 200) {
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('description').textContent = data.weather[0].description;
                document.getElementById('temperature').textContent = `Temperatur: ${data.main.temp}°C`;
                document.getElementById('min-max-temp').textContent = `Min: ${data.main.temp_min}°C | Max: ${data.main.temp.max}°C`;
            } else {
                alert("By ikke funnet. Prøv igjen.");
            }
        })
        .catch(error => {
            console.error("API-feil: ", error);
            alert("Noe gikk galt med værdataforespørselen.");
        });
}

// Feilhåndteringsfunksjon hvis geolokasjon feiler
function error() {
    alert("Kunne ikke hente din plassering.");
    console.error("Geolokasjon feilet.");
}

// Kall funksjonen når siden lastes inn
window.onload = function() {
    getWeatherForCurrentLocation();

    document.getElementById('search-button').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            getWeatherByCity(city);
        } else {
            alert("Vennligst skriv inn et bynavn.");
        }
    });
};

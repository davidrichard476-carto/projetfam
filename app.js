function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("fr-CA");
}

setInterval(updateClock,1000);
updateClock();



async function loadWeather(){

    try{

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=45.99&longitude=-73.43&current_weather=true"
        );

        const data = await response.json();

        document.getElementById("temp").innerHTML =
            data.current_weather.temperature + " °C";

    }catch(error){

        document.getElementById("temp").innerHTML =
            "Erreur météo";

        console.log(error);
    }
}

loadWeather();

//------------------------------------
// HORLOGE
//------------------------------------

function updateClock() {

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("fr-CA");

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("fr-CA", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

setInterval(updateClock, 1000);
updateClock();

//------------------------------------
// METEO SAINT-PAUL
//------------------------------------

async function loadWeather() {

    const url = "https://api.open-meteo.com/v1/forecast?latitude=45.99&longitude=-73.43&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto";

    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current_weather.temperature;

    document.getElementById("temp").innerHTML =
        temp + "°C";

    document.getElementById("currentWeather").innerHTML =
        "Conditions actuelles";

    let forecast = "";

    for (let i = 0; i < 3; i++) {

        forecast += `
        <div>
            Jour ${i + 1} :
            ${data.daily.temperature_2m_max[i]}°
            /
            ${data.daily.temperature_2m_min[i]}°
        </div>`;
    }

    document.getElementById("forecast").innerHTML =
        forecast;
}

loadWeather();
setInterval(loadWeather, 900000);

//------------------------------------
// NHL
//------------------------------------

async function loadNHL() {

    try {

        const response = await fetch(
            "https://api-web.nhle.com/v1/score/now"
        );

        const data = await response.json();

        let html = "";

        data.games.slice(0, 10).forEach(game => {

            html += `
            <div>
                ${game.awayTeam.abbrev}
                ${game.awayTeam.score}
                -
                ${game.homeTeam.score}
                ${game.homeTeam.abbrev}
            </div>`;
        });

        document.getElementById("nhl").innerHTML = html;

    } catch {

        document.getElementById("nhl").innerHTML =
            "Données NHL indisponibles";
    }
}

loadNHL();
setInterval(loadNHL, 300000);

//------------------------------------
// NFL
//------------------------------------

async function loadNFL() {

    try {

        const response = await fetch(
            "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard"
        );

        const data = await response.json();

        let html = "";
        let ticker = "";

        data.events.slice(0, 10).forEach(game => {

            const c =
                game.competitions[0].competitors;

            const score =
                `${c[0].team.abbreviation} ${c[0].score} - ${c[1].score} ${c[1].team.abbreviation}`;

            html += `<div>${score}</div>`;

            ticker += score + " | ";
        });

        document.getElementById("nfl").innerHTML =
            html;

        document.getElementById("ticker").innerHTML =
            ticker;

    } catch {

        document.getElementById("nfl").innerHTML =
            "NFL indisponible";
    }
}

loadNFL();
setInterval(loadNFL, 300000);

//------------------------------------
// PROCHAIN MATCH DU CH
//------------------------------------

async function loadCanadiensGame() {

    try {

        const response = await fetch(
            "https://api-web.nhle.com/v1/club-schedule-season/MTL/now"
        );

        const data = await response.json();

        const next = data.games.find(
            g => g.gameState === "FUT"
        );

        if (next) {

            const opponent =
                next.homeTeam.abbrev === "MTL"
                    ? next.awayTeam.abbrev
                    : next.homeTeam.abbrev;

            const date =
                new Date(next.startTimeUTC);

            document.getElementById("next-game").innerHTML =
                `
                MTL vs ${opponent}<br>
                ${date.toLocaleDateString("fr-CA")}<br>
                ${date.toLocaleTimeString("fr-CA")}
                `;
        }

    } catch {

        document.getElementById("next-game").innerHTML =
            "Information indisponible

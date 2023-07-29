function convertUnixUTcToTime(sunrise, sunset, jsonData) {

    let sunriseSunset = [sunrise, sunset, jsonData.dt];

    let convertedTime = [];
    for (let eachitem of sunriseSunset) {
        let unix_timestamp = eachitem;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        convertedTime.push(formattedTime);
    }

    let sunRise = document.getElementById("sunRise");
    sunRise.textContent = convertedTime[0] + " AM";

    let sunSet = document.getElementById("sunSet");
    sunSet.textContent = convertedTime[1] + " PM";

}

function getWindDirection(degree) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(degree / 45) % 8];
}

function removeLoading() {
    const contentLoading = document.querySelectorAll(".remove-loading");
    contentLoading.forEach((eachElement) => {
        eachElement.classList.remove("placeholder");
    });
}

function addLoading() {
    const contentLoading = document.querySelectorAll(".remove-loading");
    contentLoading.forEach((eachElement) => {
        eachElement.classList.add("placeholder");
    });
}
removeLoading();

function bgImageChange(jsonData) {
    let {
        description
    } = jsonData.weather[0];
    console.log(jsonData.weather[0].main);

    let mainContainer = document.getElementById("mainContainer");
    // mainContainer.setAttribute("loading","lazy")

    if (description === "scattered clouds") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687093559/Weather%20Application/photo-1440407876336-62333a6f010f_mu1vlf.jpg')";
    } else if (description === "overcast clouds") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687089390/Weather%20Application/photo-1479688895406-3f032f15f0ef_jrtorg.jpg')";
    } else if (description === "clear sky") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687086347/Weather%20Application/photo-1601297183305-6df142704ea2_xrid73.jpg')";
    } else if (description === "broken clouds") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687085664/Weather%20Application/field-clouds-sky-earth-46160_ke09vv.jpg')";
    } else if (description === "haze") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687084944/Weather%20Application/pexels-photo-39811_jdwjzh.jpg')";
    } else if (description === "moderate rain") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687092691/Weather%20Application/photo-1530454411895-dc5536962cab_dtbow3.jpg')";
    } else if (description === "light rain") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687092716/Weather%20Application/photo-1518803194621-27188ba362c9_utad0o.jpg')";
    } else if (description === "heavy intensity rain") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687092740/Weather%20Application/free-photo-of-people-walking-in-heavy-rain-in-city_wjkf0b.jpg')";
    } else if (description === "fog") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687093155/Weather%20Application/photo-1513147122760-ad1d5bf68cdb_bgrohz.jpg')";
    } else if (description === "few clouds") {
        mainContainer.style.backgroundImage = "url('https://res.cloudinary.com/djkatupvr/image/upload/v1687093656/Weather%20Application/photo-1467601558372-f99aeb150ad5_snfqjj.jpg')";
    }

}

function appendToDocument(jsonData) {
    let {
        temp,
        pressure,
        humidity,
        feels_like,
        temp_min,
        temp_max
    } = jsonData.main;
    let {
        speed,
        deg
    } = jsonData.wind;
    let {
        country,
        sunrise,
        sunset
    } = jsonData.sys;
    let {
        lon,
        lat
    } = jsonData.coord;


    let TempSupEl = document.createElement("sup");
    TempSupEl.textContent = "°C";

    let FeelLikeSupEl = document.createElement("sup");
    FeelLikeSupEl.textContent = "°C";

    let MinTempSupEl = document.createElement("sup");
    MinTempSupEl.textContent = "°C";

    let maxTempSupEl = document.createElement("sup");
    maxTempSupEl.textContent = "°C";


    let realFeelEl = document.getElementById("realFeel");
    realFeelEl.textContent = parseInt(feels_like);
    realFeelEl.appendChild(FeelLikeSupEl);

    let temperatureEl = document.getElementById("tempResult");
    temperatureEl.textContent = parseInt(temp);
    temperatureEl.appendChild(TempSupEl);


    let minTemp = document.getElementById("minTemperature");
    minTemp.textContent = "Min temp : " + temp_min;
    minTemp.appendChild(MinTempSupEl);

    let maxTemp = document.getElementById("maxTemperature");
    maxTemp.textContent = "Max temp : " + temp_max;
    maxTemp.appendChild(maxTempSupEl);

    document.getElementById("humidity").textContent = humidity + "%";

    document.getElementById("pressure").textContent = pressure + " mbar";

    document.getElementById("windSpeed").textContent = parseInt((speed * 3600) / 1000) + " km/h";

    document.getElementById("windDirection").textContent = getWindDirection(deg);

    document.getElementById("cityAndCountry").textContent = jsonData.name + ", " + country;

    document.getElementById("clouds").textContent = jsonData.weather[0].description;

    document.getElementById("latitude").textContent = lat;

    document.getElementById("longitude").textContent = lon;

    let currentDateTime = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    document.getElementById("dateDisplay").textContent = currentDateTime.getDate() + " " + monthNames[currentDateTime.getMonth()] + " " + currentDateTime.getFullYear();

    // live time update
    let startTime = setInterval(() => {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let seconds = today.getSeconds();

        let amOrPm = "";

        if (seconds < 10) {
            seconds = "0" + seconds;
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        } else if (hours < 10) {
            hours = "0" + hours;
        }

        if (hours <= 12) {
            amOrPm = "AM";
        } else {
            amOrPm = "PM";
        }

        document.getElementById("timeDisplay").textContent = hours + " : " + minutes + " : " + seconds + " " + amOrPm;
    }, 1000);


    // current cloud status images
    let cloudimageUrl = `https://openweathermap.org/img/wn/${ jsonData.weather[0].icon}@2x.png`;
    document.getElementById("cloudImage").src = cloudimageUrl;


    convertUnixUTcToTime(sunrise, sunset, jsonData);
}

async function getWeatherData(event) {
    if (event.key === "Enter") {
        addLoading();

        let searchInput = document.getElementById("searchInput");
        let location = searchInput.value;

        const apiKey = "9b9463da3e1fec74150dbd471369e7ef";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        let options = {
            method: "GET"
        };

       try{
            const response = await fetch(url, options);
            const jsonData = await response.json();

            if (jsonData.cod === "404" && jsonData.message === "city not found") {
                alert("City not found !");
                getWeatherDataOnLoad();
            }

            // console.log(jsonData);
            bgImageChange(jsonData);
            appendToDocument(jsonData);
            removeLoading();
       }catch(err){
            console.error(err.messagge)
            alerrt(err.messagge)
       }
    }
}

//default weather
async function getWeatherDataOnLoad() {
    addLoading();
    let location = "Hyderabad";
    const apiKey = "9b9463da3e1fec74150dbd471369e7ef";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    let options = {
        method: "GET"
    };

    try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        
        bgImageChange(jsonData);
        appendToDocument(jsonData);
        removeLoading();
        document.getElementById('pageLoading').style.display = "none";
    } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching weather data:", error);
        alert(error.message);
    }

}
getWeatherDataOnLoad();

document.getElementById("searchInput").addEventListener("keydown", getWeatherData);



let weatherContainer = document.getElementById("weatherContainer");
let aboutContainer = document.getElementById("aboutContainer");
let AboutBtn = document.getElementById("AboutBtn");
AboutBtn.onclick = () => {
    weatherContainer.classList.toggle("d-none");
    aboutContainer.classList.toggle("d-none");

    if(aboutContainer.classList.contains("d-none")){
        AboutBtn.textContent = "About";
    }else{
        AboutBtn.textContent = "Home";
    
    }
}


const searchButton = document.getElementById('searchbtn');
const cityInput = document.getElementById('cityinput');
const currentCity = document.getElementById('todayCity');
const todayTemp = document.getElementById('todayTemp');
const todayWind = document.getElementById('todayWind');
const todayHumidity = document.getElementById('todayHumidity');
const todayUVIndex = document.getElementById('todayUVIndex');
const date2 = document.getElementById('date2');
const date3 = document.getElementById('date3');
const date4 = document.getElementById('date4');
const date5 = document.getElementById('date5');
const date6 = document.getElementById('date6');
const temp2 = document.getElementById('temp2');
const temp3 = document.getElementById('temp3');
const temp4 = document.getElementById('temp4');
const temp5 = document.getElementById('temp5');
const temp6 = document.getElementById('temp6');
const wind2 = document.getElementById('wind2');
const wind3 = document.getElementById('wind3');
const wind4 = document.getElementById('wind4');
const wind5 = document.getElementById('wind5');
const wind6 = document.getElementById('wind6');
const humidity2 = document.getElementById('humidity2');
const humidity3 = document.getElementById('humidity3');
const humidity4 = document.getElementById('humidity4');
const humidity5 = document.getElementById('humidity5');
const humidity6 = document.getElementById('humidity6');
const apiKey = 'b0db25ba3c4d57ca7000c1766bfb3cef';

var weatherData;
var currentCityData;

searchButton.addEventListener('click', getWeather);

function getWeather(){
    var city = cityInput.value;
    var fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    fetch(fetchUrl)
        .then(function (response) {
        return response.json();})
        .then(function (cityData) {

            currentCityData = cityData
            const cityLat = cityData.coord.lat;
            const cityLon = cityData.coord.lon;
            const oneBaseUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
            

    fetch(oneBaseUrl)
        .then(function (response) {
            return response.json();})
        .then(function (data) {
            
            weatherData = data;
            console.log(weatherData);
            console.log(cityData);
            updateDashboard();

        })
        
    })

    
};

function updateDashboard(){

    currentCity.textContent = currentCityData.name + ': ' + moment.unix(weatherData.current.dt).format('dddd Do MMMM');
    todayTemp.textContent = 'Temp: ' + Math.round(weatherData.current.temp);
    todayWind.textContent = 'Wind: ' + Math.round(weatherData.current.wind_speed) + 'MPH';
    todayHumidity.textContent = 'Humidity: ' + weatherData.current.humidity + '%';
    todayUVIndex.textContent = 'UV Index:' + weatherData.current.uvi;

    date2.textContent = moment.unix(weatherData.daily[1].dt).format('dddd Do MMMM');
    date3.textContent = moment.unix(weatherData.daily[2].dt).format('dddd Do MMMM');
    date4.textContent = moment.unix(weatherData.daily[3].dt).format('dddd Do MMMM');
    date5.textContent = moment.unix(weatherData.daily[4].dt).format('dddd Do MMMM');
    date6.textContent = moment.unix(weatherData.daily[5].dt).format('dddd Do MMMM');

    temp2.textContent = 'Temp: ' + Math.round(weatherData.daily[1].temp.max);
    temp3.textContent = 'Temp: ' + Math.round(weatherData.daily[2].temp.max);
    temp4.textContent = 'Temp: ' + Math.round(weatherData.daily[3].temp.max);
    temp5.textContent = 'Temp: ' + Math.round(weatherData.daily[4].temp.max);
    temp6.textContent = 'Temp: ' + Math.round(weatherData.daily[5].temp.max);

    wind2.textContent = 'Wind: ' + Math.round(weatherData.daily[1].wind_speed) + 'MPH';
    wind3.textContent = 'Wind: ' + Math.round(weatherData.daily[2].wind_speed) + 'MPH';
    wind4.textContent = 'Wind: ' + Math.round(weatherData.daily[3].wind_speed) + 'MPH';
    wind5.textContent = 'Wind: ' + Math.round(weatherData.daily[4].wind_speed) + 'MPH';
    wind6.textContent = 'Wind: ' + Math.round(weatherData.daily[5].wind_speed) + 'MPH';

    humidity2.textContent = 'Humidity: ' + weatherData.daily[1].humidity + '%';
    humidity3.textContent = 'Humidity: ' + weatherData.daily[2].humidity + '%';
    humidity4.textContent = 'Humidity: ' + weatherData.daily[3].humidity + '%';
    humidity5.textContent = 'Humidity: ' + weatherData.daily[4].humidity + '%';
    humidity6.textContent = 'Humidity: ' + weatherData.daily[5].humidity + '%';
}

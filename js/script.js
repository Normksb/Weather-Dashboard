const searchButton = document.getElementById('searchbtn');
const cityInput = document.getElementById('cityinput');
const currentCity = document.getElementById('todayCity');
const todayTemp = document.getElementById('todayTemp');
const todayWind = document.getElementById('todayWind');
const todayHumidity = document.getElementById('todayHumidity');
const todayUVIndex = document.getElementById('todayUVIndex');
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
}

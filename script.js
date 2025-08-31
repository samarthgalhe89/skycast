document.addEventListener('DOMContentLoaded', () => {
  const getWeatherBtn = document.getElementById('get-weather-btn')
  const weatherInfo = document.getElementById('weather-info')
  const cityNameDisplay = document.getElementById('city-name')
  const temperatureDisplay = document.getElementById('temperature')
  const descriptionDisplay = document.getElementById('description')
  const errorMessage = document.getElementById('error-message')
  const cityInput = document.getElementById('city-input')
  
  const API_KEY = "992db68675111a6b258bde5d55acde28"; //env variables

  getWeatherBtn.addEventListener('click', async ()=> { // async coz we are taking data from the internet and it takes time!
    const city = cityInput.value.trim();
    if(!city) return;

    try {
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
    
  })

  async function fetchWeatherData(city){
    //gets the data!
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}
`;

    const response = await fetch(url); //fetch url is requesting data from the server!
    console.log(typeof response);
    console.log("RESPONSE: ", response);
    
    if(!response.ok){
      throw new Error("City not found!")
    }
    const data = await response.json()
    return data;
  }

  function displayWeatherData(data){
    console.log(data);
    const {name, main, weather} = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    
    //unlock the display
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
    
  }

  function showError(){
    weatherInfo.classList.add('hidden')
    errorMessage.classList.remove('hidden')
  }

})
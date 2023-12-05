//state
let currCity = document.querySelector('.weather_searchform')
const apiKey = '6d788d18e6161b5abbea6a672b36af51'
apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

//selectors
let city =document.querySelector('.weather_city');
let datetime = document.querySelector('.weather_datetime');
let weather_forecast = document.querySelector('.weather_forecast');
let weather_temperature=document.querySelector(".weather_temperature");
let weather_icon=document.querySelector('.weather_icon');
let weather_minmax=document.querySelector('.min');
let weather_max = document.querySelector('.max');
let weather_realfeel=document.querySelector('.weather_realfeel');
let weather_humidity=document.querySelector('.weather_humidity');
let weather_wind=document.querySelector('.weather_wind');
let weather_pressure=document.querySelector('.weather_pressure');




function convertTimeStamp(timestamp,timezone){
  const convertTimezone=timezone/3600;//convert seconds to hours

  const date=new Date(timestamp*1000);

  const option={
    weekday: 'long',
     day:'numeric',
     month:'long',
     year:'numeric',
     hour:'numeric',
     minute:'numeric',
     timezone:`Etc/GMT${convertTimezone>=0?"-":"+"}${Math.abs(convertTimezone)}`,
     hour12:true
  }
  return date.toLocaleString("en-US",option)
}


async function checkWeather(city1){
    const response = await fetch(apiUrl + city1 + `&appid=${apiKey}`);
    var data = await response.json();

    // Creating a fucntion to changeWeatherIcon according to the weather situation
function changeWeatherIcon(){
  if (data.weather[0].main == 'Clouds'){
    weather_icon.innerHTML = `<img src="./clouds.png">`
  }
  else if (data.weather[0].main == 'Clear'){
    weather_icon.innerHTML = `<img src="./clear.png">`
  }
  else if (data.weather[0].main == 'Rain'){
    weather_icon.innerHTML = `<img src="./rain.png">`
  }
  else if (data.weather[0].main == 'Snow'){
    weather_icon.innerHTML = `<img src="./snow.png">`
  }
  else if (data.weather[0].main == 'Drizzle'){
    weather_icon.innerHTML = `<img src="./drizzle.png">`
  }
  else if (data.weather[0].main == 'Mist'){
    weather_icon.innerHTML = `<img src="./mist.png">`
  }

}       
        city.innerHTML =`${data.name}, ${data.sys.country}`
        datetime.innerHTML=convertTimeStamp(data.dt, data.sys.  timezone);
        weather_forecast.innerHTML= `<p>${data.weather[0].main}</p>`
        weather_temperature.innerHTML=`${data.main.temp.toFixed()}&#176`
        // Calling function changeWeatherIcon
        changeWeatherIcon()
        weather_minmax.innerHTML=`<p>Min:${data.main.temp_min.toFixed()}&#176</p>`
        weather_max.innerHTML = `<p>Max:${data.main.temp_max.toFixed()}&#176</p>`
        weather_realfeel.innerHTML=`${data.main.feels_like.toFixed()}&#176`
        weather_humidity.innerHTML= `${data.main.humidity}%`
        weather_wind.innerHTML=`${data.wind.speed}m/s`
        weather_pressure.innerHTML=`${data.main.pressure}hpa`
    }
 const load = document.getElementById("body")
 load.ondblclick = function(){
  checkWeather(currCity.value)
 } 
 load.onload = function(){
  checkWeather(currCity.value)
 } 
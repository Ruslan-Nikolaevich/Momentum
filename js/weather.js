//e1d72e28e02f94355ab593a406f5f72a
const masLeng = ['en','ru']
const spedWind = ['Wind speed:','Скорость ветра']
const windUnit = [' m/s',' м/с'];
const humidityMasLeng = ['Humidity','Влажность'];
const temperatureUnit = '˚';
const humidityUnit = '%';


const pressure = ' mmHg';

const pressureRU = ' мм. рт. ст.';


const newCityName = document.querySelector('.city');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const owf = document.querySelector('.owf');
const weatherIcon = document.querySelector('.weather-icon');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

function setpressure() {
    
    let Leng = masLeng[0];
    let spedWindLeng = spedWind[0];
    let windUnitLeng = windUnit[0]; 
    let humidityleng = humidityMasLeng[0];
    if (translateFlag === 0) {
        Leng = masLeng[0];
        spedWindLeng = spedWind[0];
        windUnitLeng = windUnit[0];
        humidityleng = humidityMasLeng[0];
    } else {
        Leng = masLeng[1];
        spedWindLeng = spedWind[1];
        windUnitLeng = windUnit[1];
        humidityleng = humidityMasLeng[1];
    }

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem ('city')}&appid=e1d72e28e02f94355ab593a406f5f72a&lang=${Leng}`)
    .then(function (resp) {
        return resp.json();    
    })
    .then (function (data) {
        weatherError.innerHTML = "";
        owf.classList.remove(`owf-${localStorage.getItem('owf')}`); // убираем прошлый клас, что бы не наслаивались иконке
        localStorage.setItem('owf',data.weather[0].id);
        owf.classList.add(`owf-${localStorage.getItem('owf')}`); // добавляем иконку из файла owfont-regular
       // owf.classList.add(`owf-${dat}`); // добавляем иконку из файла owfont-regular
        console.log(`owf-${data.weather[0].id}`);
        console.log( localStorage.getItem ('city'));
         console.log(data);
        temperature.innerHTML = `${Math.round(data.main.temp - 273)}${temperatureUnit}` 
        weatherDescription.innerHTML = data.weather[0].description;  //описание погоды
        wind.innerHTML = `${spedWindLeng} ${Math.round((data.wind.speed))}${windUnitLeng}`;
        humidity.innerHTML = `${humidityleng} ${data.main.humidity}${humidityUnit}`;
        console.log((data.name));
        newCityName.value = data.name;
        localStorage.setItem('city',data.name);
       
    })
    .catch(function () {
        weatherError.innerHTML = 'Ошибка, город не найден';
    });
    // console.log((masLeng[1]));
}


newCityName.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        weatherIcon.innerHTML="";
        setpressure();
    }
    
});




const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
const body = document.querySelector('body');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const city = document.querySelector('.city');
const langEng =document.querySelector('.lang-eng');
const langRu =document.querySelector('.lang-ru');
//alert('реализован дополнительный функционал: автоматическая смена картинок и цитат случайным образом каждые 30 секунд');


let LocalStName ='';
let morning;
let indexSlide=1;
let randomImg;
let translateFlag = 0;
//tm.getFullYear - получаем год
//tm.getMonth()  - месяцы идут с 0 до 11
//tm.getDate - получаем дату идет с 1 до 30/31
//tm.getDay() - текущий день недели начиная с воскресенья = 0, понедельник = 1 и т.д.
//tm.getHours - часы от 0 до 24
const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const daysOfWeekRu = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const monthsRu = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
const greetingsDate = ['Good morning','Good afternoon','Good evening','Good night'];
const greetingsDateRu = ['Доброе утро','Добрый день','Добрый вечер','Доброй ночи'];
const TimesOfDay = ['morning','afternoon','evening','night'];
const cityName =['Minsk'];
const cityNameRu =['Минск'];
function getRandomInt() {
    randomImg = correct((Math.floor(Math.random() * 19)+1));
  }

document.addEventListener('DOMContentLoaded', () => { // при перезагрузке страницы вставляем данные из localStorage
    partDay();  
    getRandomInt();
    body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+randomImg+".jpg"+")";
    nameInput.value = localStorage.getItem('name');
    console.log('randomImg-1 = '+(randomImg-1));
    quote.innerHTML = quotes[(randomImg-1)].quote;
    author.innerHTML = quotes[(randomImg-1)].autor;
    if(localStorage.getItem('city') == ''){
        city.value = localStorage.setItem('city','Minsk');
    }
    city.value = localStorage.getItem('city');
    setpressure();  //ф-я находится в файле weather  устанавливаем погоду при перезагрузке
})

function correct(param) {   // добавляем 0 ко времени если меньше 10 число
    return ((param < 10) ? '0'+param : param);
}

function partDay(tm = new Date()) {   //в зависимости от времени пишем приветствие 
    if (tm.getHours() >= 6 && tm.getHours() <= 11) {
        greeting.innerHTML = greetingsDate[0];
        morning = 0;
        // console.log(morning);
    } else if(tm.getHours() >= 12 && tm.getHours() <= 17) {
        greeting.innerHTML = greetingsDate[1];
        morning = 1;
        // console.log(morning);
    } else if(tm.getHours() >= 18 && tm.getHours() <= 23){
        greeting.innerHTML = greetingsDate[2];
        morning = 2;
        // console.log(morning);
    } else {
        greeting.innerHTML = greetingsDate[3];
        morning = 3;
        // console.log(morning);
    }  
}
function partDayRu(tm = new Date()) {   //в зависимости от времени пишем приветствие на русском
    if (tm.getHours() >= 6 && tm.getHours() <= 11) {
        greeting.innerHTML = greetingsDateRu[0];
        morning = 0;
        // console.log(morning);
    } else if(tm.getHours() >= 12 && tm.getHours() <= 17) {
        greeting.innerHTML = greetingsDateRu[1];
        morning = 1;
        // console.log(morning);
    } else if(tm.getHours() >= 18 && tm.getHours() <= 23){
        greeting.innerHTML = greetingsDateRu[2];
        morning = 2;
        // console.log(morning);
    } else {
        greeting.innerHTML = greetingsDateRu[3];
        morning = 3;
        // console.log(morning);
    }  
}

window.setInterval(function showTime() {  // ф-я времени обновляемся каждую 1сек
    const tm = new Date();
    
    time.innerHTML = `${correct(tm.getHours())}:${correct(tm.getMinutes())}:${correct(tm.getSeconds())}`;
    
    // console.log(tm.getHours());
    // console.log(tm.getMinutes());
    // partDay(tm);

    eventForm();
    setCity();
    if (translateFlag === 0) {
        nameInput.placeholder="[Enter name]";
        partDay(tm);
       // city.value = localStorage.getItem('city'); //cityName[0];
        date.innerHTML = `${daysOfWeek[tm.getDay()]}, ${months[tm.getMonth()]} ${tm.getDate()}`;
    } else if(translateFlag === 1){
        nameInput.placeholder="[Введите имя]";
        partDayRu(tm);
        //city.value = localStorage.getItem('city');
        date.innerHTML = `${daysOfWeekRu[tm.getDay()]}, ${monthsRu[tm.getMonth()]} ${tm.getDate()}`;
    }
   
},1000);

window.setInterval(() => {
    getRandomInt();
    body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+randomImg+".jpg"+")";
    if (translateFlag === 0){
        quote.innerHTML = quotes[randomImg-1].quote;
        author.innerHTML = quotes[randomImg-1].autor;
    } else if(translateFlag === 1) {
        quote.innerHTML = quotesRu[randomImg-1].quote;
        author.innerHTML = quotesRu[randomImg-1].autor;
    }
}, 30000)

function eventForm() {   // запихиваем данные из input в localStorage
    
    localStorage.setItem ('name',nameInput.value); 
    }
function setCity() { // запихиваем данные из input cyti в localStorage
     
    localStorage.setItem ('city',city.value);
}
   


slideNext.addEventListener('click', () => {
    slideNext.setAttribute('disabled', true);
   
    let data;
    // console.log('Путь к директории ='+TimesOfDay[morning]);
   
    if (indexSlide > 20) {
        indexSlide =1;
        data =correct(indexSlide);
        body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+data+".jpg"+")";

    } else {
        data =correct(indexSlide);
        body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+data+".jpg"+")";
    }
    
    console.log(data);
    console.log(indexSlide);
    setTimeout(() => {
        slideNext.removeAttribute('disabled');
         }, 2000)
         indexSlide++;
})

slidePrev.addEventListener('click', () => {
    slidePrev.setAttribute('disabled', true);
    
    let data; 
    if (indexSlide <= 0) {
        indexSlide = 20;
        data =correct(indexSlide);
        body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+data+".jpg"+")";

    } else {
        data =correct(indexSlide);
        body.style.backgroundImage = "url(https://raw.githubusercontent.com/Ruslan-Nikolaevich/stage1-tasks/assets/images/"+TimesOfDay[morning]+"/"+data+".jpg"+")";
    }
  
    console.log(data);
    console.log(indexSlide);
    setTimeout(() => {
        slidePrev.removeAttribute('disabled');
         }, 2000)
         indexSlide--;
    
})

changeQuote.addEventListener('click', () => {
    getRandomInt();
    if (translateFlag === 0){
        quote.innerHTML = quotes[randomImg-1].quote;
        author.innerHTML = quotes[randomImg-1].autor;
    } else if(translateFlag === 1) {
        quote.innerHTML = quotesRu[randomImg-1].quote;
        author.innerHTML = quotesRu[randomImg-1].autor;
    }
    // console.log('changeQuote = '+(randomImg-1));
    
});
// console.log(quotes.length);
// console.log(quotes[0].autor);
function translateRu() {
    langEng.classList.remove('leng-active');
    langRu.classList.add('leng-active');
    translateFlag = 1;
        quote.innerHTML = quotesRu[randomImg-1].quote;
        author.innerHTML = quotesRu[randomImg-1].autor;
        setpressure();
}
function translateEn() {
    langRu.classList.remove('leng-active');
    langEng.classList.add('leng-active');
    translateFlag = 0;
    quote.innerHTML = quotes[randomImg-1].quote;
    author.innerHTML = quotes[randomImg-1].autor;
    setpressure();
}

langEng.addEventListener('click',translateEn);
langRu.addEventListener('click',translateRu);





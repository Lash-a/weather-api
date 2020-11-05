const weatherSearchSection = document.querySelector('.search-for-weather');
const searchBtn = document.getElementById("search-btn");
const navbar = document.querySelector('nav h2');
const weatherInfoDiv = document.querySelector('.weather-container');
const searchOutput = document.getElementById('weather-search-input');
const citySpan = document.getElementById('city-holder');
const tempSpan = document.getElementById('temp-holder');
const descSpan = document.getElementById('description-holder');

let city;



const getData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01eea58136f2d3e93258f66afa40c3f6`)
    .then(response => response.json())
    .then(data => {
        let cityName = data.name;
        let temp = data.main.temp;
        let description = data.weather[0].description;
        // console.log(`
        // namevalue is ${cityName}
        // tempvalue is ${temp}
        // descValue is ${description}
        // `);
        citySpan.innerHTML = cityName;
        let celcius = Math.floor((temp - 273.15)) + "C";
        // console.log(celcius);
        tempSpan.innerHTML = celcius;
        descSpan.innerHTML = description;
    })
    .catch(err => alert("Enter Valid City Name in Input"));
}; 


function init(){
    hideSearch();
    getOutput();
    
}


const hideSearch = () => {

    navbar.addEventListener('click', () => {
        weatherSearchSection.style.display = 'flex';
        weatherInfoDiv.style.display = 'none';
        searchOutput.value = '';
    });
};

const validationAndValue = () => {
    if(searchOutput.value === ""){
        searchOutput.placeholder = "Enter City Name";
        searchOutput.classList.toggle('placeholder');
    }else if(searchOutput.value != ""){
        weatherSearchSection.style.display = 'none';
        weatherInfoDiv.style.display = 'flex';
        // console.log(searchOutput.value);
        city = searchOutput.value;
        return city;
    }
}


const getOutput = () => {
    searchBtn.addEventListener('click', () => {
       validationAndValue();
       getData();
    });

    searchOutput.addEventListener('keydown', (e) => {
        if (event.keyCode === 13) {
            validationAndValue();
            getData();
        }
    });
}

init();

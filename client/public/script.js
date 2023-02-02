
let rootEl, inputEl, divContainer, sectionUp, nameDiv, dateDiv, 
iconDiv, iconImg, iconText, temperatureDiv, sectionDown, 
sectionLeft, minMaxTempDiv, currentTempDiv, inputContainer,
favBtn, showBtn, favList, favDiv,bool = true;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const introAnimation = () => {
  const introImg = document.querySelector(".introImg");
  const introContainer = document.querySelector(".introContainer");

  setTimeout(function(){
    introImg.className = "introImgVisible";

    setTimeout(function(){
      introContainer.className = "introContainerHide";
      introImg.className = "introImgHide";

      setTimeout(function(){
        introContainer.hidden = true;
        introImg.hidden = true;
      }, 4000)
      
    },3000)
    
  },1000)
}

const createInput = () => {
  rootEl = document.getElementById("root");

  document.body.className = "bg-info";

  inputContainer = document.createElement("div");
  inputContainer.id = "inputContainer";
  rootEl.append(inputContainer);
  
  inputEl = document.createElement("input");
  inputEl.placeholder = "Search for a city";
  inputEl.hidden = true
  setTimeout(function(){inputEl.hidden = false},4000)
  inputContainer.append(inputEl);
  
  divContainer = document.createElement("div");
  divContainer.id = "divContainer";
  rootEl.append(divContainer);

  inputEl.addEventListener("input", function(e){
    if (e.target.value.length > 1) {
      let autocomplete = new google.maps.places.Autocomplete(inputEl, {
        types: ["(cities)"],
      });

      google.maps.event.addListener(autocomplete, "place_changed", function () {
        let place = autocomplete.getPlace();
        fetchData(place.name);
      });
    }
    
  })

}

async function fetchData(currentPlace) {
  const API_KEY = 'a812d4795a874a76b3081357233101';
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currentPlace.normalize('NFD').replace(/[\u0300-\u036f]/g,'')}&days=7`;
  const response = await fetch(url);
  const data = await response.json();

  displayStructure(data)
}

const displayStructure = (data) => {

  divContainer.innerHTML = "";

  sectionUp = document.createElement("div");
  sectionUp.id = "sectionUp";
  divContainer.append(sectionUp);

  sectionLeft = document.createElement("div");
  sectionLeft.id = "sectionLeft";
  
  temperatureDiv = document.createElement("div");
  temperatureDiv.id = "temperatureDiv";
  sectionUp.append(sectionLeft,temperatureDiv);

  nameDiv = document.createElement("div");
  nameDiv.id = "nameDiv";
  nameDiv.innerText = data.location.name

  dateDiv = document.createElement("div");
  dateDiv.id = "dateDiv";
  dateDiv.innerText = data.forecast.forecastday[0].date

  iconDiv = document.createElement("div");
  iconDiv.id = "iconDiv";
  sectionLeft.append(nameDiv, dateDiv, iconDiv);

  iconImg = document.createElement("img");
  iconImg.src = data.forecast.forecastday[0].day.condition.icon;
  iconDiv.append(iconImg);

  iconText = document.createElement("div");
  iconText.id = "iconText";
  iconText.innerText = data.forecast.forecastday[0].day.condition.text;
  iconDiv.append(iconImg, iconText);

  currentTempDiv = document.createElement("div");
  currentTempDiv.id = "currentTempDiv";
  currentTempDiv.innerText = data.forecast.forecastday[0].day.avgtemp_c + "\u00B0";
  temperatureDiv.append(currentTempDiv);

  minMaxTempDiv = document.createElement("div");
  minMaxTempDiv.id = "minMaxTempDiv";
  minMaxTempDiv.innerText = `${data.forecast.forecastday[0].day.mintemp_c} \u00B0 / ${
  data.forecast.forecastday[0].day.maxtemp_c} \u00B0`;
  temperatureDiv.appendChild(minMaxTempDiv);
  
  // Botoom section
  sectionDown = document.createElement("div");
  sectionDown.id = "sectionDown";
  divContainer.append(sectionDown);

  for(let i = 1; i < 7; i++){
    let dayDiv = document.createElement("div");
    dayDiv.style.paddingLeft = "8px"
    dayDiv.style.paddingRight= "8px"

    let dayName = document.createElement("div");
    let dayIcon = document.createElement("img");
    let dayTemp = document.createElement("div");
    
    dayName.innerText = days[(new Date(data.forecast.forecastday[i].date)).getDay()];
    dayIcon.src = data.forecast.forecastday[i].day.condition.icon;
    dayTemp.innerText = `${data.forecast.forecastday[i].day.mintemp_c}\u00B0 / ${
    data.forecast.forecastday[i].day.maxtemp_c}\u00B0`;
    dayTemp.style.fontSize = "15px"
    
    dayDiv.append(dayName, dayIcon, dayTemp);
    sectionDown.appendChild(dayDiv)
  }
  
  favBtn.hidden = false
  setBootstrap()
}

const setBootstrap = () => {

  divContainer.className = "card border-muted shadow-lg";
  iconImg.className = "d-inline";
  iconText.className = "d-inline";
  sectionDown.className = "card-footer bg-transparent border-muted";
  currentTempDiv.className = "fs-1"
  showBtn.className = 'btn btn-secondary'
  favBtn.className = 'btn btn-secondary'

}

const createFavElements = () =>{

  favDiv = document.createElement('div')
  favDiv.className = 'favDiv'
  document.body.append(favDiv)
  
  let favListTitle = document.createElement('h2')
  favListTitle.innerText = 'Favorite List'

  favList = document.createElement('div')
  favList.className = 'favList'
  favDiv.append(favListTitle,favList)
  favDiv.hidden = true
  
  favBtn = document.createElement('button')
  favBtn.innerText = 'Add to Favorites'
  favBtn.id = 'favBtn'
  inputContainer.append(favBtn)
  favBtn.addEventListener('click',addFavorites)
  favBtn.hidden = true
  
  showBtn = document.createElement('button')
  showBtn.innerText = 'Show Favorites'
  showBtn.id = 'showBtn'
  showBtn.addEventListener('click',showFavorites)
  inputContainer.insertAdjacentElement('afterbegin',showBtn)
  showBtn.hidden = true
}

const addFavorites = () =>{
  let li = document.createElement('p')
  li.innerText = inputEl.value
  favList.append(li)
  showBtn.hidden = false
  li.addEventListener('click', (e) =>{
    console.log(e.target.innerText)
    inputEl.value = e.target.innerText
    fetchData(e.target.innerText)
  })
  
}

const showFavorites = () =>{

let mainContainer = document.querySelector("#mC")
bool = !bool
favDiv.hidden = bool
bool ? mainContainer.className = 'mainContainer':
 mainContainer.className = "mainContainerAside"
}

const loadEvent = function() {

  introAnimation();
  createInput();
  createFavElements();

}

window.addEventListener("load", loadEvent);

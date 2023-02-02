
let rootEl, inputEl, divContainer, 
sectionUp, nameDiv, dateDiv, 
iconDiv, iconImg, iconText, 
temperatureDiv, sectionDown, 
sectionLeft, minMaxTempDiv, 
currentTempDiv, inputContainer,
favBtn, showBtn, favList;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

async function fetchData(currentPlace) {
  const API_KEY = 'a812d4795a874a76b3081357233101';
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currentPlace}&days=7`;

  const response = await fetch(url);
  const data = await response.json();

  displayStructure(data)
}

const displayStructure = (data) => {

  console.log(data);

  divContainer.innerHTML = "";

  sectionUp = document.createElement("div");
  sectionUp.id = "sectionUp";
  divContainer.appendChild(sectionUp);

  sectionLeft = document.createElement("div");
  sectionLeft.id = "sectionLeft";
  sectionUp.appendChild(sectionLeft);

  nameDiv = document.createElement("div");
  nameDiv.id = "nameDiv";
  sectionLeft.appendChild(nameDiv);
  nameDiv.innerText = data.location.name

  dateDiv = document.createElement("div");
  dateDiv.id = "dateDiv";
  sectionLeft.appendChild(dateDiv);
  dateDiv.innerText = data.forecast.forecastday[0].date

  iconDiv = document.createElement("div");
  iconDiv.id = "iconDiv";
  sectionLeft.appendChild(iconDiv);

  iconImg = document.createElement("img");
  iconImg.src = data.forecast.forecastday[0].day.condition.icon;
  iconDiv.appendChild(iconImg);

  iconText = document.createElement("div");
  iconText.id = "iconText";
  iconText.innerText = data.forecast.forecastday[0].day.condition.text;
  iconDiv.appendChild(iconText);

  temperatureDiv = document.createElement("div");
  temperatureDiv.id = "temperatureDiv";
  sectionUp.appendChild(temperatureDiv);

  currentTempDiv = document.createElement("div");
  currentTempDiv.id = "currentTempDiv";
  currentTempDiv.innerText = data.forecast.forecastday[0].day.avgtemp_c + "\u00B0";
  temperatureDiv.appendChild(currentTempDiv);

  minMaxTempDiv = document.createElement("div");
  minMaxTempDiv.id = "minMaxTempDiv";
  minMaxTempDiv.innerText = `${data.forecast.forecastday[0].day.mintemp_c} \u00B0 / ${data.forecast.forecastday[0].day.maxtemp_c} \u00B0`;
  temperatureDiv.appendChild(minMaxTempDiv);
  
  // Botoom section

  sectionDown = document.createElement("div");
  sectionDown.id = "sectionDown";
  divContainer.appendChild(sectionDown);

  for(let i = 1; i < 7; i++){
    let dayDiv = document.createElement("div");
    dayDiv.style.paddingLeft = "8px"
    dayDiv.style.paddingRight= "8px"
    dayDiv.id = `day${i}`;

    let dayName = document.createElement("div");
    let dayIcon = document.createElement("img");
    let dayTemp = document.createElement("div");
    
    dayDiv.append(dayName, dayIcon, dayTemp);

    dayName.innerText = days[(new Date(data.forecast.forecastday[i].date)).getDay()];
    dayIcon.src = data.forecast.forecastday[i].day.condition.icon;
    dayTemp.innerText = `${data.forecast.forecastday[i].day.mintemp_c}\u00B0 / ${data.forecast.forecastday[i].day.maxtemp_c}\u00B0`;
    dayTemp.style.fontSize = "15px"
    
    sectionDown.appendChild(dayDiv)
  }
  
  favBtn.hidden = false
  favBtn.addEventListener('click',addFavorites)
  showBtn.addEventListener('click',showFavorites)

  console.log(typeof data.forecast.forecastday[2].date);
  setBootstrap()
}

const createInput = () => {
  rootEl = document.getElementById("root");

  document.body.className = "bg-info";

  inputContainer = document.createElement("div");
  inputContainer.id = "inputContainer";
  rootEl.appendChild(inputContainer);
  
  inputEl = document.createElement("input");
  inputEl.placeholder = "Search for a city";
  inputContainer.appendChild(inputEl);
  
  divContainer = document.createElement("div");
  divContainer.id = "divContainer";
  rootEl.appendChild(divContainer);

  inputEl.addEventListener("input", function(e){
    if (e.target.value.length > 1) {
      let autocomplete = new google.maps.places.Autocomplete(inputEl, {
        types: ["(cities)"],
      });

      google.maps.event.addListener(autocomplete, "place_changed", function () {
        // console.log(autocomplete.getPlace());
        let place = autocomplete.getPlace();
        fetchData(place.name);
      });
  
        // inputEl.value = place.name + " ";
        // if (inputEl.value.indexOf(" ") != -1) display.style.visibility = "visible";
        // else {
        //   display.style.visibility = "hidden";
        // }

    }
    
  })

  inputEl.addEventListener("dblclick", function(){
    const mainContainer = document.querySelector(".mainContainer");
    mainContainer.className = "mainContainerAside";

    console.log("works")
  })


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
  favList.hidden = false
}

  const createFavEl = () =>{
    favList = document.createElement('div')
    favList.className = 'favList'
    document.body.append(favList)
    favList.hidden = true
  
    favBtn = document.createElement('button')
    favBtn.innerText = 'Add to Favorites'
    inputContainer.append(favBtn)
    // favBtn.addEventListener('click',addFavorites())
    favBtn.hidden = true
  
    showBtn = document.createElement('button')
    showBtn.innerText = 'Show Favorites'
    inputContainer.insertAdjacentElement('afterbegin',showBtn)
    showBtn.hidden = true

  }

const setBootstrap = () => {
  // divContainer.classList.add("card", "border-success", "mb-3")


  divContainer.className = "card border-muted shadow-lg";
  iconImg.className = "d-inline";
  iconText.className = "d-inline";
  sectionDown.className = "card-footer bg-transparent border-muted";
  currentTempDiv.className = "fs-1"


  // sectionLeft.className = "d-inline";
  // temperatureDiv.className = "d-inline";
  // nameDiv.className = "card-header bg-transparent";
  // currentTempDiv.className = "d-block";
  // minMaxTempDiv.className = "d-block";
  // sectionUp.className = "d-inline"
  // sectionLeft.className = "p-25"



}


const loadEvent = function() {
  const introImg = document.querySelector(".introImg");

  setTimeout(function(){
    introImg.className = "introImgVisible";


    setTimeout(function(){
      const introContainer = document.querySelector(".introContainer");
      introContainer.className = "introContainerHide";
      introImg.className = "introImgHide";

      setTimeout(function(){
        introContainer.hidden = true;
        introImg.hidden = true;
      }, 4000)

    },3000)
  
  },1000)


  createInput();
  createFavEl();


}

window.addEventListener("load", loadEvent);

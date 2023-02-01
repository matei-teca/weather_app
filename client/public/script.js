
let rootEl, inputEl, divContainer, 
sectionUp, nameDiv, dateDiv, 
iconDiv, iconImg, iconText, 
temperatureDiv, sectionDown, sectionLeft, minMaxTempDiv, currentTempDiv,favBtn, favList;
let favArr = []

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
  
  console.log(typeof data.forecast.forecastday[2].date);
  setBootstrap()

}

const createInput = () => {
  rootEl = document.getElementById("root");

  inputEl = document.createElement("input");
  inputEl.placeholder = "test";
  inputEl.setAttribute('list', 'favList')
  rootEl.appendChild(inputEl);

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


}

const setBootstrap = () => {
  // divContainer.classList.add("card", "border-success", "mb-3")


  divContainer.className = "card border-muted";
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

const favorites = () =>{

  favBtn = document.createElement('button')
  favBtn.id = "favBtn"
  favBtn.innerText = "Add to favorites"
  favBtn.className = "btn btn-secondary"
  rootEl.append(favBtn)

  favList = document.createElement('datalist')
  favList.id = 'favList' 

  favBtn.addEventListener('click', (e) =>{
    let option = document.createElement('option')
    option.value = inputEl.value
    favList.append(option)
    console.log(favList)
  })



}

const loadEvent = function() {


  createInput();
  favorites()



}

window.addEventListener("load", loadEvent);

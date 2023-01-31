let rootEl;
const API_KEY = 'a812d4795a874a76b3081357233101';

async function fetchData(currentPlace) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${currentPlace}&days=7`
  const response = await fetch(url);
  const data = await response.json();

  displayStructure(data)
}

const displayStructure = (data) => {

  console.log(data);

  divContainer.innerHTML = "";

  let sectionUp = document.createElement("div");
  sectionUp.id = "sectionUp";
  divContainer.appendChild(sectionUp);

  let nameDiv = document.createElement("div");
  nameDiv.id = "nameDiv";
  sectionUp.appendChild(nameDiv);
  nameDiv.innerText = data.location.name

  let dateDiv = document.createElement("div");
  dateDiv.id = "dateDiv";
  sectionUp.appendChild(dateDiv);
  dateDiv.innerText = data.forecast.forecastday[0].date

  let iconDiv = document.createElement("div");
  iconDiv.id = "iconDiv";
  sectionUp.appendChild(iconDiv);

  let iconImg = document.createElement("img");
  iconImg.src = data.forecast.forecastday[0].day.condition.icon;
  iconDiv.appendChild(iconImg);

  let iconText = document.createElement("div");
  iconText.id = "iconText";
  iconText.innerText = data.forecast.forecastday[0].day.condition.text;
  iconDiv.appendChild(iconText);
  

  let temperatureDiv = document.createElement("div");
  temperatureDiv.id = "temperatureDiv";
  sectionUp.appendChild(temperatureDiv);
  
  // Botoom section

  let sectionDown = document.createElement("div");
  sectionDown.id = "sectionDown";
  divContainer.appendChild(sectionDown);

  for(let i = 1; i < 7; i++){
    let dayDiv = document.createElement("div");
    dayDiv.id = `day${i}`;

    sectionDown.appendChild(dayDiv)
  }
  




}

const createInput = () => {
  rootEl = document.getElementById("root");
  let inputEl = document.createElement("input");
  inputEl.placeholder = "test";
  rootEl.appendChild(inputEl);
  let divContainer = document.createElement("div");
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
  
        // inputEl.value = place.name + " ";
        // if (inputEl.value.indexOf(" ") != -1) display.style.visibility = "visible";
        // else {
        //   display.style.visibility = "hidden";
        // }

        fetchData(place.name);
      });
    }
  })


}

const loadEvent = function() {

  createInput();

}

window.addEventListener("load", loadEvent);

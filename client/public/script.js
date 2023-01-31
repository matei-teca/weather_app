let rootEl;
async function fetchData() {

  const API_KEY = 'sdO7fUPMhc7LFVDpSLjDbNunVouBfN24Qnpyxaat';
  const url = `https://api.nasa.gov/planetary/apod?date=${dateSelected}&api_key=${API_KEY}`

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

}

const createInput = () => {
  rootEl = document.getElementById("root");
  let inputEl = document.createElement("input");
  inputEl.placeholder = "test";
  rootEl.appendChild(inputEl);

  inputEl.addEventListener("input", function(e){
    if (e.target.value.length > 1) {
      let autocomplete = new google.maps.places.Autocomplete(inputEl, {
        types: ["(cities)"],
      });
      google.maps.event.addListener(autocomplete, "place_changed", function () {
        console.log(autocomplete.getPlace());
        let place = autocomplete.getPlace();
  
        input.value = place.name + " ";
        if (input.value.indexOf(" ") != -1) display.style.visibility = "visible";
        else {
          display.style.visibility = "hidden";
        }
      });
    }
  })

}

const loadEvent = function() {

  createInput()
}

window.addEventListener("load", loadEvent);

let rootEl;
// let url;
const API_KEY = 'a812d4795a874a76b3081357233101';

async function fetchData(currentPlace) {
  let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${currentPlace}`
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

  createInput()

}

window.addEventListener("load", loadEvent);

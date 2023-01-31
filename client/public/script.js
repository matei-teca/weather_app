
async function fetchData() {

  const API_KEY = 'sdO7fUPMhc7LFVDpSLjDbNunVouBfN24Qnpyxaat';
  const url = `https://api.nasa.gov/planetary/apod?date=${dateSelected}&api_key=${API_KEY}`

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

}


const loadEvent = function() {


}

window.addEventListener("load", loadEvent);

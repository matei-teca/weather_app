
async function fetchData() {

  const API_KEY = 'a812d4795a874a76b3081357233101';
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=`

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

}


const loadEvent = function() {
  fetchData()

}

window.addEventListener("load", loadEvent);

const fs = require('fs');
const cities = JSON.parse(fs.readFileSync('world-cities_json.json', 'utf8'))

console.log(cities);

// async function testing(){

//     let response = await fetch("http://api.weatherapi.com/v1/search.json?key=a812d4795a874a76b3081357233101&q=Romania");
//     let data = await response.json();

//     console.log(data);

// }

// testing();

import * as fs from 'node:fs';

const citiesDB = []

const cities = JSON.parse(fs.readFileSync('world-cities_json.json', 'utf8'))


cities.forEach(city => {
    citiesDB.push(city)
})


export { citiesDB }

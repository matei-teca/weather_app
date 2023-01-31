import * as http from 'node:http';
import {citiesDB} from './process.js';


const server = http.createServer((req, res) => {

	if (req.method === "GET") {

		if(req.url === "/data.js"){

			res.writeHead(200, { "Content-Type": "text/javascript" });
			res.write(`
				const data=${JSON.stringify(citiesDB)};
				export {data};
			`);
			res.end();

		}

	}

});

server.listen(9000, "127.0.0.1", () => {
	const addr = server.address();
	console.log(`Open this link in your browser: http://${addr.address}:${addr.port}`);
});
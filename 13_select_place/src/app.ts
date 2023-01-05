
import axios from "axios";

import Map from 'ol/Map';
import OSM from 'ol/source/OSM.js';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';


type NominatimGeoResponse = {
	lat: number;
	lon: number;
	display_name: string;
}[];


const form = document.querySelector("form")!;
form.addEventListener("submit", searchAddressHandler);

const addressInput = document.getElementById("address")! as HTMLInputElement;
const info = document.getElementById("info")! as HTMLParagraphElement;
const coordinates = document.getElementById("coordinates")! as HTMLParagraphElement;


function searchAddressHandler(event: Event) {
	event.preventDefault();

	const enteredAddress = addressInput.value;
	console.log(enteredAddress);

	const urlAddress = encodeURI(enteredAddress);
	const req = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${urlAddress}&format=json&limit=1`;
	console.log(req);

	axios.get<NominatimGeoResponse>(req)
		.then(resp => {
			console.log(resp);
			if (resp.data.length === 0)
				throw new Error("Can't fetch the location!");
			
			const lat = resp.data[0].lat;
			const lon = resp.data[0].lon;
			console.log(lat, lon);

			coordinates.textContent = `(${lat}, ${lon})`;
			info.textContent = resp.data[0].display_name;

			mapDisplay(true, lat, lon);
		})
		.catch(err => {
			console.log(err);

			coordinates.textContent = "";
			info.textContent = err;

			mapDisplay(false, 0, 0);
	});
}


const view = new View({
	center: [0, 0],
	projection: "EPSG:900913",
	zoom: 1,
});

new Map({
	target: 'map',
	view: view,
	layers: [
		new TileLayer({
			source: new OSM()
		})
	],
});

function mapDisplay(ok: boolean, lat: number, lon: number) {
	view.setCenter(fromLonLat([lon, lat], "EPSG:900913"));
	
	if (ok) {
		view.setZoom(15);
	}
	else {
		view.setZoom(1);
	}
}
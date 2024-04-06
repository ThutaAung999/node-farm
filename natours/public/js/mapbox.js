

const locations= JSON.parse(document.getElementById('map').dataset.locations)
console.log(locations)

maptilersdk.config.apiKey = 'IAd8rvnqXUMsACg2wBWS';
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: [16.62662018, 49.2125578], // starting position [lng, lat]
  zoom: 14 // starting zoom
});
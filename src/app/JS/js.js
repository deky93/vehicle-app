var map;
//import "leaflet";
var marker;

export var polyline;
export function initMap() {
  map = L.map("map").setView([44.787197, 20.457273], 11);
  const tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors',
    }
  );
  tiles.addTo(map);
}
export function getPolyLine(historyPolyLine) {
  var polyline = L.polyline(historyPolyLine, { color: "blue" }).addTo(map);
  map.fitBounds(polyline.getBounds());
}
export function clearMap() {
  if (map) {
    for (let i in map._layers) {
      if (map._layers[i]._path != undefined) {
        try {
          map.removeLayer(map._layers[i]);
        } catch (e) {
          console.log("problem with " + e + map._layers[i]);
        }
      }
    }
  }
}

export function clearMarkers() {
  if (marker != undefined) {
    map.removeLayer(marker);
  }
}

export function drawPolyline(arrayOutter){ 
    polyline = L.polyline(arrayOutter, { color: 'blue' }).addTo(map); 
 
 }
 
 
 export function drawMarker(coordinates){
    marker = L.marker(coordinates); 
    marker.addTo(map);
    map.setView(coordinates, 15);
 }
 
 export function fitBounds(polyline){
 
   //var featureGroup =  L.featureGroup(this.coordinates);
 
   map.fitBounds(polyline.getBounds());
 }
 
 export function listCountriesCities(res, countries, cities) {
   countries.push(res[0].drzava);
   cities.push(res[0].grad);
   res.forEach((data) => {
     if (!cities.includes(data.grad)) { 
       countries.push(data.drzava);
     }
 
     if (!cities.includes(data.grad)) {
       cities.push(data.grad);
     }
   });
 }
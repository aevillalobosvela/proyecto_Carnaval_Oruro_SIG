console.log("funciona");
var marker = null;

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
    $("#icon").toggleClass("fa-arrow-circle-left fa-arrow-circle-right");
  });
});

var map = L.map("map").setView([-17.961255, -67.106084], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

document
  .getElementById("select-location")
  .addEventListener("change", function (e) {
    let coords = e.target.value.split(",");
    map.flyTo(coords, 17);
    if (marker) {
      map.removeLayer(marker);
    }
    marker = L.marker(e.target.value.split(",")).addTo(map);
    markeroption = 1;
  });

var osmLayer = new L.TileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

var miniMap = new L.Control.MiniMap(osmLayer, {
  toggleDisplay: true,
  minimized: false,
}).addTo(map);

/* --------------------------------------------------------------------------------------- */

var control = L.Routing.control({
  waypoints: [
    L.latLng(-17.957698858097284, -67.10479645507664),
    L.latLng(-17.971733507016566, -67.10885929781035),
    L.latLng(-17.970181994386778, -67.1143898297924),
    L.latLng(-17.969409843816948, -67.11415085708268),
    L.latLng(-17.96918072361231, -67.11491139699112),
    L.latLng(-17.96986526191086, -67.11518774943974),
    L.latLng(-17.969082146804247, -67.11783859001508),
    L.latLng(-17.96966674556441, -67.11610591497566),
    L.latLng(-17.96834667582797, -67.11760169584966),
    L.latLng(-17.968095941829972, -67.1180628381041),
    L.latLng(-17.967262017512915, -67.11782537992146),
    L.latLng(-17.96710468338142, -67.11806298847657),
  ],
  router: L.Routing.graphHopper("0269abc3-031c-448e-95c7-3db60aaa6dc0", {
    urlParameters: {
      vehicle: "foot",
      locale: "es", // Opcional: ajusta el idioma de las instrucciones de la ruta
    },
  }),
  show: false, // Oculta la ruta por defecto
  showMarkers: false, // Oculta los marcadores
  routeWhileDragging: true,
}).addTo(map);



/* var control = L.Routing.control({
  routeWhileDragging: true,
}).addTo(map);

var selectedPoints = [];

function onMapClick(e) {
  console.log(selectedPoints);
  if (selectedPoints.length < 2) {
    selectedPoints.push(e.latlng);
    L.marker(e.latlng).addTo(map);

    if (selectedPoints.length === 2) {
      control.setWaypoints(selectedPoints);
    }
  }
}

map.on("click", onMapClick);
 */

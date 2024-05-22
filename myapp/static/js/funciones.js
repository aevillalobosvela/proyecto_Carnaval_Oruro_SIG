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

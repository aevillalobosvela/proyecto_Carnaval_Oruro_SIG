var marker = null;
var userLocation; // Variable para almacenar la ubicación del usuario
var selectedDestination; // Variable para almacenar la ubicación de destino seleccionada
var routingControl;

/* -MAPA 2-------------------------------------------------------------------------------------- */
var map2 = L.map("map2", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 15,
  maxZoom: 18,
  minZoom: 14,
});

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
).addTo(map2);

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
}).addTo(map2);

var usuarioIcon = L.divIcon({
  html: '<i class="fa fa-map-marker fa-3x"></i>',
  className: "usuario-icon",
});

function onLocationFound(e) {
  userLocation = e.latlng;
  // Agregar un marcador en la ubicación del usuario
  var marker = L.marker(e.latlng, { icon: usuarioIcon })
    .addTo(map2)
    .bindPopup("Usted esta aqui")
    .openPopup();
  // Centrar el mapa en la ubicación del usuario
  map2.setView(e.latlng, 15);
}

// Función para manejar errores de geolocalización
function onLocationError(e) {
  alert(e.message);
}

// Solicitar la ubicación del usuario
map2.on("locationfound", onLocationFound);
map2.on("locationerror", onLocationError);

// Iniciar la solicitud de geolocalización
map2.locate({ setView: true, maxZoom: 16 });

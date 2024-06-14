var map2 = L.map("map2", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 14,
  maxZoom: 18,
  minZoom: 14,
});

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(map2);

// Función para mover el mapa a la ubicación seleccionada y abrir el popup del marcador
function moveToLocation(e) {
  let coords = e.target.value.split(",");
  if (coords.length === 2) {
    let lat = parseFloat(coords[0]);
    let lng = parseFloat(coords[1]);

    // Ajuste de la latitud para mover el mapa ligeramente hacia arriba
    let offsetLat = 0.0012; // Ajusta este valor según sea necesario
    let adjustedLat = lat + offsetLat;

    let latLng = [adjustedLat, lng];
    map2.flyTo(latLng, 18);

    // Buscar el marcador correspondiente y abrir su popup
    map2.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer.getLatLng().equals([lat, lng])) {
        layer.openPopup();
      }
    });
  }
}
// Asignar el evento change a cada select
document
  .getElementById("select-hoteles")
  .addEventListener("change", moveToLocation);
document
  .getElementById("select-restaurantes")
  .addEventListener("change", moveToLocation);
document
  .getElementById("select-museos")
  .addEventListener("change", moveToLocation);
document
  .getElementById("select-iglesias")
  .addEventListener("change", moveToLocation);
  
document.addEventListener("DOMContentLoaded", function () {
  var Hoteles = [];
  var Comidas = [];
  var Museos = [];
  var Iglesias = [];

  fetch("/obtener_punto_conoce/")
    .then((response) => response.json())
    .then((data) => {
      var puntos = data;
      puntos.forEach(function (data) {
        let markerIcon = L.icon({
          iconUrl: data.imagen_ruta,
          iconSize: [42, 42],
          popupAnchor: [0, -32],
        });
        let marker = L.marker(data.coord, { icon: markerIcon }).addTo(map2);
        marker.bindPopup(`
          <div class="text-center">
            <h4 >${data.name}</h4>
            <img src="${data.imagen_ruta}" alt="${data.name}" style="width: 150px;">
            <p style="color: black; line-height: 1.2; ">${data.descripcion}</p>
            <p style="color: black; line-height: 1.2; ">${data.detalles}</p>
          </div>
        `);

        if (data.titulo == "Hotel") {
          Hoteles.push(data);
        }
        if (data.titulo == "Comida") {
          Comidas.push(data);
        }
        if (data.titulo == "Museo") {
          Museos.push(data);
        }
        if (data.titulo == "Iglesia") {
          Iglesias.push(data);
        }
      });
      addOptionsToSelect("select-hoteles", Hoteles, "Hotel");
      addOptionsToSelect("select-restaurantes", Comidas, "Comida");
      addOptionsToSelect("select-museos", Museos, "Museo");
      addOptionsToSelect("select-iglesias", Iglesias, "Iglesia");
    });
});

var carto = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
).addTo(map2);

var google = L.tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}");
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

// Crear un control de capas para los mapas base
var mapasBase = {
  Carto: carto,
  OpenStreet: osm,
  Google: google,
};

// Crear un control de capas para los mapas base
L.control
  .layers(mapasBase, null, {
    position: "topright",
    collapsed: false,
  })
  .addTo(map2);

function addOptionsToSelect(selectId, locations, category) {
  let select = document.getElementById(selectId);
  locations
    .filter((loc) => loc.titulo === category)
    .forEach((location) => {
      let option = document.createElement("option");
      option.value = location.coord.join(",");
      option.text = location.name;
      select.add(option);
    });
}

var carto_light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "©OpenStreetMap, ©CartoDB", subdomains: "abcd", maxZoom: 24 }
);

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomright",
}).addTo(map2);

// Función para buscar un lugar y mover el mapa a su ubicación
function searchLocation(event) {
  event.preventDefault();
  fetch("/obtener_punto_conoce/")
    .then((response) => response.json())
    .then((data) => {
      var puntos = data;
      let input = document.getElementById("search-input").value.toLowerCase();
      let found = false;

      puntos.forEach((data) => {
        if (data.name.toLowerCase().includes(input)) {
          let latLng = data.coord;
          let lat = parseFloat(data.coord[0]);
          let lng = parseFloat(data.coord[1]);
      
          let offsetLat = 0.0012;
          let adjustedLat = lat + offsetLat;
      
          latLng2 = [adjustedLat, lng];
          map2.flyTo(latLng2, 18);

          // Buscar el marcador correspondiente y abrir su popup
          map2.eachLayer((layer) => {
            if (layer instanceof L.Marker && layer.getLatLng().equals(latLng)) {
              layer.openPopup();
            }
          });

          found = true;
        }
      });
      if (!found) {
        alert("Lugar no encontrado.");
      }
    });
}

// Asignar el evento submit al formulario de búsqueda
document
  .getElementById("search-form")
  .addEventListener("submit", searchLocation);

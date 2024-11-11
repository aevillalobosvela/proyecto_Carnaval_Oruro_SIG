var userLocation;
var control = null;
var routingControl = null;
let routeLayer = null;

function mostrarHotel() {
  document.getElementById("select-hoteles").style.display = "block";
  document.getElementById("select-restaurantes").style.display = "none";
  document.getElementById("select-museos").style.display = "none";
  document.getElementById("select-iglesias").style.display = "none";
}

function mostrarRest() {
  document.getElementById("select-hoteles").style.display = "none";
  document.getElementById("select-restaurantes").style.display = "block";
  document.getElementById("select-museos").style.display = "none";
  document.getElementById("select-iglesias").style.display = "none";
}

function mostrarMuseo() {
  document.getElementById("select-hoteles").style.display = "none";
  document.getElementById("select-restaurantes").style.display = "none";
  document.getElementById("select-museos").style.display = "block";
  document.getElementById("select-iglesias").style.display = "none";
}

function mostrarIglesia() {
  document.getElementById("select-hoteles").style.display = "none";
  document.getElementById("select-restaurantes").style.display = "none";
  document.getElementById("select-museos").style.display = "none";
  document.getElementById("select-iglesias").style.display = "block";
}

// Inicializa el mapa
var map = L.map("map", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 14,
  maxZoom: 18,
  minZoom: 14,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

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

function onLocationFound(e) {
  userLocation = e.latlng;
  var marker = L.marker(e.latlng)
    .addTo(map)
    .bindPopup("Usted esta aqui")
    .openPopup();
  map.setView(e.latlng, 15);
}

function onLocationError(e) {
  alert(e.message);
}

map.on("locationfound", onLocationFound);
map.on("locationerror", onLocationError);

map.locate({ setView: true, maxZoom: 16 });

/* -LUGARES-------------------------------------------------------------------------------------- */

var hotelIcon = L.icon({
  iconUrl: "/static/img/generaruta/hotelito.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const foodIcon = L.icon({
  iconUrl: "/static/img/generaruta/hamburguesa.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const tourismIcon = L.icon({
  iconUrl: "/static/img/generaruta/turir.png",
  iconSize: [40, 40],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const hotelLayer = L.layerGroup();
const foodLayer = L.layerGroup();
const tourismLayer = L.layerGroup();

document.addEventListener("DOMContentLoaded", function () {
  fetch("/obtener_punto_planifica/")
    .then((response) => response.json())
    .then((data) => {
      var puntos = data;
      var hotelSelect = document.getElementById("hotelSelect");
      var foodSelect = document.getElementById("foodSelect");
      var tourismSelect = document.getElementById("tourismSelect");
      puntos.forEach(function (data) {
        var option = document.createElement("option");
        option.value = data.coord.join(", ");
        option.text = data.name;

        if (data.titulo == "Hotel") {
          L.marker(data.coord, { icon: hotelIcon })
            .bindPopup(data.name)
            .addTo(hotelLayer);
          hotelSelect.appendChild(option);
        }
        if (data.titulo == "Comida") {
          L.marker(data.coord, { icon: foodIcon })
            .bindPopup(data.name)
            .addTo(foodLayer);
          foodSelect.appendChild(option);
        }
        if (data.titulo == "Turismo") {
          L.marker(data.coord, { icon: tourismIcon })
            .bindPopup(data.name)
            .addTo(tourismLayer);
          tourismSelect.appendChild(option);
        }
      });
      hotelLayer.addTo(map);
      foodLayer.addTo(map);
      tourismLayer.addTo(map);

      var overlayMaps2 = {
        "Hoteles y alojamientos": hotelLayer,
        Restaurantes: foodLayer,
        "Lugares turisticos": tourismLayer,
      };

      L.control.layers(null, overlayMaps2, { collapsed: false }).addTo(map);
    })
    .catch((error) => console.error("Error:", error));
});

function selectOption(selectId, lat, lon) {
  document.getElementById(selectId).value = `${lat},${lon}`;
}

// Generar ruta
document.getElementById("generateRoute").addEventListener("click", function () {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  // Elimina la capa de marcadores anterior si existe
  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  control = null;
  const hotelCoords = document.getElementById("hotelSelect").value.split(",");
  const foodCoords = document.getElementById("foodSelect").value.split(",");
  const tourismCoords = document
    .getElementById("tourismSelect")
    .value.split(",");

  const waypoints = [
    L.latLng(userLocation),
    L.latLng(parseFloat(hotelCoords[0]), parseFloat(hotelCoords[1])),
    L.latLng(parseFloat(foodCoords[0]), parseFloat(foodCoords[1])),
    L.latLng(parseFloat(tourismCoords[0]), parseFloat(tourismCoords[1])),
  ];

  // Crear marcadores con iconos personalizados
  const hotelMarker = L.marker(
    [parseFloat(hotelCoords[0]), parseFloat(hotelCoords[1])],
    { icon: hotelIcon }
  ).bindPopup("Hotel");
  const foodMarker = L.marker(
    [parseFloat(foodCoords[0]), parseFloat(foodCoords[1])],
    { icon: foodIcon }
  ).bindPopup("Restaurante");
  const tourismMarker = L.marker(
    [parseFloat(tourismCoords[0]), parseFloat(tourismCoords[1])],
    { icon: tourismIcon }
  ).bindPopup("Lugar Turístico");

  // Añadir marcadores a la capa de la ruta
  routeLayer = L.layerGroup([hotelMarker, foodMarker, tourismMarker]).addTo(
    map
  );

  routingControl = L.Routing.control({
    waypoints: waypoints,
    router: L.Routing.graphHopper("0269abc3-031c-448e-95c7-3db60aaa6dc0", {
      urlParameters: {
        vehicle: "car",
        locale: "es", // Opcional: ajusta el idioma de las instrucciones de la ruta
      },
    }),
    show: true, // Oculta la ruta por defecto
    showMarkers: false, // Oculta los marcadores
    routeWhileDragging: false,
  }).addTo(map);
  map.flyTo(L.latLng(parseFloat(foodCoords[0]), parseFloat(foodCoords[1])), 15);
});

// Generar ruta a pie
document.getElementById("generateRoutePie").addEventListener("click", function () {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  // Elimina la capa de marcadores anterior si existe
  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  control = null;
  const hotelCoords = document.getElementById("hotelSelect").value.split(",");
  const foodCoords = document.getElementById("foodSelect").value.split(",");
  const tourismCoords = document
    .getElementById("tourismSelect")
    .value.split(",");

  const waypoints = [
    L.latLng(userLocation),
    L.latLng(parseFloat(hotelCoords[0]), parseFloat(hotelCoords[1])),
    L.latLng(parseFloat(foodCoords[0]), parseFloat(foodCoords[1])),
    L.latLng(parseFloat(tourismCoords[0]), parseFloat(tourismCoords[1])),
  ];

  // Crear marcadores con iconos personalizados
  const hotelMarker = L.marker(
    [parseFloat(hotelCoords[0]), parseFloat(hotelCoords[1])],
    { icon: hotelIcon }
  ).bindPopup("Hotel");
  const foodMarker = L.marker(
    [parseFloat(foodCoords[0]), parseFloat(foodCoords[1])],
    { icon: foodIcon }
  ).bindPopup("Restaurante");
  const tourismMarker = L.marker(
    [parseFloat(tourismCoords[0]), parseFloat(tourismCoords[1])],
    { icon: tourismIcon }
  ).bindPopup("Lugar Turístico");

  // Añadir marcadores a la capa de la ruta
  routeLayer = L.layerGroup([hotelMarker, foodMarker, tourismMarker]).addTo(
    map
  );

  routingControl = L.Routing.control({
    waypoints: waypoints,
    router: L.Routing.graphHopper("0269abc3-031c-448e-95c7-3db60aaa6dc0", {
      urlParameters: {
        vehicle: "foot",
        locale: "es", // Opcional: ajusta el idioma de las instrucciones de la ruta
      },
    }),
    show: true, // Oculta la ruta por defecto
    showMarkers: false, // Oculta los marcadores
    routeWhileDragging: false,
  }).addTo(map);
  map.flyTo(L.latLng(parseFloat(foodCoords[0]), parseFloat(foodCoords[1])), 15);
});

// Crear instancias de capas de mapa adicionales
var google = L.tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}");
var opentopomap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
);
var carto = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
);

// Función para generar una ruta aleatoria
function generateRandomRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  var hotels = [];
  var food = [];
  var tourism = [];

  fetch("/obtener_punto_planifica/")
    .then((response) => response.json())
    .then((data) => {
      var puntoss = data;
      puntoss.forEach(function (data) {
        if (data.titulo == "Hotel") {
          hotels.push(data);
        }
        if (data.titulo == "Comida") {
          food.push(data);
        }
        if (data.titulo == "Turismo") {
          tourism.push(data);
        }
      });

      const randomHotel = hotels[Math.floor(Math.random() * hotels.length)];
      const randomFood = food[Math.floor(Math.random() * food.length)];
      const randomTourism = tourism[Math.floor(Math.random() * tourism.length)];
      var coordHotel = {
        lat: randomHotel.coord[0],
        lng: randomHotel.coord[1],
      };
      var coordFood = {
        lat: randomFood.coord[0],
        lng: randomFood.coord[1],
      };
      var coordTourism = {
        lat: randomTourism.coord[0],
        lng: randomTourism.coord[1],
      };
      const waypoints = [
        L.latLng(userLocation),
        L.latLng(coordHotel),
        L.latLng(coordFood),
        L.latLng(coordTourism),
      ];

      routingControl = L.Routing.control({
        waypoints: waypoints,
        router: L.Routing.graphHopper("0269abc3-031c-448e-95c7-3db60aaa6dc0", {
          urlParameters: {
            vehicle: "car",
            locale: "es", // Opcional: ajusta el idioma de las instrucciones de la ruta
          },
        }),
        show: true, // Oculta la ruta por defecto
        showMarkers: false, // Oculta los marcadores
        routeWhileDragging: false,
      }).addTo(map);

      displayRecommendation(
        randomHotel,
        randomFood,
        randomTourism,
        coordHotel,
        coordFood,
        coordTourism
      );
    });
}

// Función para mostrar la recomendación
function displayRecommendation(
  hotel,
  food,
  tourism,
  coordhotel,
  coordfood,
  coordtour
) {
  const recommendationDiv = document.getElementById("recommendation");
  recommendationDiv.innerHTML = `
    <div class="card mx-auto"  style="width: 100%;">
      <div class="card-body">
          <h5 class="card-title">Recomendación de Ruta</h5>
          <h6 class="card-subtitle mb-2 text-muted">Ruta sugerida</h6>
          <p class="card-text"><strong>Hotel:</strong> ${hotel.name}</p>
          <p class="card-text"><strong>Restaurante:</strong> ${food.name}</p>
          <p class="card-text"><strong>Lugar Turístico:</strong> ${tourism.name}</p>
          <a href="#" class="card-link" onclick="goToLocation(${coordhotel.lat}, ${coordhotel.lng})">Ir al Hotel</a>
          <a href="#" class="card-link" onclick="goToLocation(${coordfood.lat}, ${coordfood.lon})">Ir al Restaurante</a>
          <a href="#" class="card-link" onclick="goToLocation(${coordtour.lat}, ${coordtour.lon})">Ir al Lugar Turístico</a>
        </div>
      </div>
  `;
}

// Función para centrar el mapa en la ubicación seleccionada
function goToLocation(lat, lon) {
  map.setView([lat, lon], 16);
}

function guardarCalificacion() {
  $("#thankYouModal").modal("show");
}

function obtenerLugaresRecomendados() {
  const lugares = [
    "Museo Nacional Antropológico Eduardo López Rivas",
    "Restaurante El Negrito",
    "Museo Simón I. Patiño",
    "Hotel Glorioso",
    "Museo Sacro del Santuario del Socavón",
    "Gran Hotel Bolivia",
    "Museo Mineralógico",
    "Hostal Graciela",
    "Casa Arte Taller Cardozo Velasquez Oruro",
    "La Casona",
    "Estación Superior Teleférico Turístico",
    "Hotel Plaza",
    "Esculturas Plaza Chiripujio",
    "Gran Hotel Galaxia",
    "Museo Arqueológico",
  ];

  // Shuffle array (Fisher-Yates algorithm)
  for (let i = lugares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lugares[i], lugares[j]] = [lugares[j], lugares[i]];
  }

  return lugares.slice(0, 2); // Obtener los primeros tres lugares aleatorios
}

function mostrarLugaresRecomendados() {
  const lugaresRecomendados = obtenerLugaresRecomendados();
  const lugaresContainer = document.getElementById("lugaresContainer");
  lugaresContainer.innerHTML = "";

  lugaresRecomendados.forEach((lugar) => {
    const lugarCard = document.createElement("div");
    lugarCard.classList.add("col-sm-12", "mb-4");

    lugarCard.innerHTML = `
      <div class="card">
          <div class="card-body">
              <h5 class="card-title">${lugar}</h5>
              <p class="card-text">¡Ven a visitarnos!</p>
          </div>
      </div>
    `;

    lugaresContainer.appendChild(lugarCard);
  });
  lugaresContainer.style.display = "flex";
}

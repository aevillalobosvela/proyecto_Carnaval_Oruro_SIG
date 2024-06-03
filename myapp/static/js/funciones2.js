// Inicializa el mapa
console.log("funciona2");

const map = L.map("map").setView(
  [-17.970316344905434, -67.11377867610823],
  14.5
); // Coordenadas iniciales de ejemplo
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
// Datos de hoteles, restaurantes y lugares turísticos
const markers = {
  hotels: [
    {
      name: "Hostal Graciela",
      lat: -17.96557445732872,
      lon: -67.10635546869543,
    },
    {
      name: "Hotel Glorioso",
      lat: -17.96236147092776,
      lon: -67.10278318404016,
    },
    {
      name: "Gran Hotel Bolivia",
      lat: -17.962245388504577,
      lon: -67.10661148774666,
    },
    { name: "Hotel Plaza", lat: -17.969128960958876, lon: -67.11433118959974 },
    { name: "Hotel Briggs", lat: -17.966435243509885, lon: -67.11511642884702 },
    {
      name: "HOTEL VIRGEN DEL SOCAVON",
      lat: -17.966999837934388,
      lon: -67.11797146632333,
    },
    {
      name: "Solárium Restaurante Hotel Edén",
      lat: -17.969679495368712,
      lon: -67.11468300546305,
    },
    { name: "Hotel Houston", lat: -17.97066614215071, lon: -67.11287912028908 },
    {
      name: "RESIDENCIAL HINOJOSA",
      lat: -17.96133155320207,
      lon: -67.10812583378078,
    },
    {
      name: "Hotel Sucre Palace",
      lat: -17.97079249639655,
      lon: -67.11288998959968,
    },
    {
      name: "Gran Hotel Galaxia",
      lat: -17.9710297289956,
      lon: -67.11040125520366,
    },
    { name: "Hotel Monarca", lat: -17.96796209935517, lon: -67.10727228033335 },
  ],
  food: [
    {
      name: "Restaurante El Negrito",
      lat: -17.970316344905434,
      lon: -67.11377867610823,
    },
    { name: "La Casona", lat: -17.96870930117551, lon: -67.11460981164859 },
    {
      name: "Restaurant Nayjama",
      lat: -17.973590414724292,
      lon: -67.1109544668418,
    },
    {
      name: "Factory Xpress",
      lat: -17.97040545305779,
      lon: -67.11318575768243,
    },
    {
      name: "Restaurant Pagador",
      lat: -17.969960995628657,
      lon: -67.11012398774643,
    },
    {
      name: "RESTAURANT VEGETARIANO GOVINDA",
      lat: -17.97176463310805,
      lon: -67.11167180731627,
    },
    { name: "Bravo's Pizza", lat: -17.96918993343915, lon: -67.11670964541871 },
    {
      name: 'Charquekan Orureño "El Puente"',
      lat: -17.95126278008152,
      lon: -67.10876464048772,
    },
    {
      name: "Churrasqueria Santa Brasa",
      lat: -17.96550514868362,
      lon: -67.10527572080795,
    },
    {
      name: "dori pollo oruro",
      lat: -17.964040814872025,
      lon: -67.10047047743406,
    },
    {
      name: "super hamburguesas oruro",
      lat: -17.96494390601734,
      lon: -67.11024889908734,
    },
    {
      name: "Restaurant El Fogón",
      lat: -17.962150621053368,
      lon: -67.10382486932191,
    },
    {
      name: "Rancheria Oruro",
      lat: -17.96362586649361,
      lon: -67.11157757054858,
    },
  ],
  tourism: [
    {
      name: "Museo Nacional Antropológico Eduardo López Rivas",
      lat: -17.981218340991997,
      lon: -67.12250936960811,
    },
    {
      name: "Museo Simón I. Patiño",
      lat: -17.967538060592556,
      lon: -67.1123490626169,
    },
    {
      name: "Museo Sacro del Santuario del Socavón",
      lat: -17.967171985345495,
      lon: -67.11886950750217,
    },
    {
      name: "Museo Mineralógico",
      lat: -17.990566057353647,
      lon: -67.13706274727136,
    },
    {
      name: "Casa Arte Taller Cardozo Velasquez Oruro",
      lat: -17.971544164910565,
      lon: -67.1017033147293,
    },
    {
      name: "Museo Diocesano San Miguel Oruro",
      lat: -17.964236861414186,
      lon: -67.112514718436,
    },
    {
      name: "Estación Superior Teleférico Turístico",
      lat: -17.974403851760847,
      lon: -67.12051834727194,
    },
    {
      name: "Museo Arqueológico",
      lat: -17.98096464920422,
      lon: -67.12270221843559,
    },
    {
      name: "Esculturas Plaza Chiripujio",
      lat: -17.97671444617219,
      lon: -67.13986746261656,
    },
  ],
};

// Función para seleccionar opción en el select correspondiente
function selectOption(selectId, lat, lon) {
  document.getElementById(selectId).value = `${lat},${lon}`;
}
// Definir iconos personalizados
const hotelIcon = L.icon({
  iconUrl: "images/hotelito.png", // URL de la imagen del ícono del hotel
  iconSize: [30, 30], // Tamaño del ícono [ancho, alto]
  iconAnchor: [15, 30], // Punto de anclaje del ícono [horizontal, vertical], en este caso, el centro inferior del ícono
  popupAnchor: [0, -30], // Punto de anclaje del popup en relación con el ícono [horizontal, vertical], en este caso, justo arriba del ícono
});

const foodIcon = L.icon({
  iconUrl: "images/hamburguesa.png", // URL de la imagen del ícono del restaurante
  iconSize: [30, 30], // Tamaño del ícono [ancho, alto]
  iconAnchor: [15, 30], // Punto de anclaje del ícono [horizontal, vertical], en este caso, el centro inferior del ícono
  popupAnchor: [0, -30], // Punto de anclaje del popup en relación con el ícono [horizontal, vertical], en este caso, justo arriba del ícono
});

const tourismIcon = L.icon({
  iconUrl: "images/turir.png", // URL de la imagen del ícono del lugar turístico
  iconSize: [30, 30], // Tamaño del ícono [ancho, alto]
  iconAnchor: [15, 30], // Punto de anclaje del ícono [horizontal, vertical], en este caso, el centro inferior del ícono
  popupAnchor: [0, -30], // Punto de anclaje del popup en relación con el ícono [horizontal, vertical], en este caso, justo arriba del ícono
});

// Crear marcadores con iconos personalizados y agregarlos a capas de marcadores
const hotelMarkers = markers.hotels.map((m) =>
  L.marker([m.lat, m.lon], { icon: hotelIcon }).bindPopup(m.name)
);
const foodMarkers = markers.food.map((m) =>
  L.marker([m.lat, m.lon], { icon: foodIcon }).bindPopup(m.name)
);
const tourismMarkers = markers.tourism.map((m) =>
  L.marker([m.lat, m.lon], { icon: tourismIcon }).bindPopup(m.name)
);

// Crear capas de marcadores con marcadores personalizados
const hotelLayer = L.layerGroup(hotelMarkers);
const foodLayer = L.layerGroup(foodMarkers);
const tourismLayer = L.layerGroup(tourismMarkers);

// Añadir las capas al mapa por defecto
hotelLayer.addTo(map);
foodLayer.addTo(map);
tourismLayer.addTo(map);

// Generar ruta
document.getElementById("generateRoute").addEventListener("click", function () {
  const hotelCoords = document.getElementById("hotelSelect").value.split(",");
  const foodCoords = document.getElementById("foodSelect").value.split(",");
  const tourismCoords = document
    .getElementById("tourismSelect")
    .value.split(",");

  const waypoints = [
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
  const routeLayer = L.layerGroup([hotelMarker, foodMarker, tourismMarker]);

  if (window.routingControl) {
    map.removeControl(window.routingControl);
  }

  window.routingControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: true,
    createMarker: function (i, waypoint, number) {
      if (number === 0) {
        return hotelMarker;
      } else if (number === 1) {
        return foodMarker;
      } else if (number === 2) {
        return tourismMarker;
      }
    },
    lineOptions: {
      styles: [{ color: "#00BFFF", weight: 6 }],
    },
  }).addTo(map);

  // Ajustar el mapa para que se centre y haga zoom en la ruta generada
  map.fitBounds(routeLayer.getBounds());
});

// Crear instancias de capas de mapa adicionales
var google = L.tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}");
var opentopomap = L.tileLayer(
  "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
);
var carto = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
);

// Añadir capas de mapa al control de capas
var baseLayers = {
  "Google Maps": google,
  OpenTopoMap: opentopomap,
  "Carto Light": carto,
};

// Añadir control de capas al mapa
L.control.layers(baseLayers).addTo(map);

// Establecer una capa de mapa predeterminada
carto.addTo(map);

// Función para generar una ruta aleatoria
function generateRandomRoute() {
  const randomHotel =
    markers.hotels[Math.floor(Math.random() * markers.hotels.length)];
  const randomFood =
    markers.food[Math.floor(Math.random() * markers.food.length)];
  const randomTourism =
    markers.tourism[Math.floor(Math.random() * markers.tourism.length)];

  const waypoints = [
    L.latLng(randomHotel.lat, randomHotel.lon),
    L.latLng(randomFood.lat, randomFood.lon),
    L.latLng(randomTourism.lat, randomTourism.lon),
  ];

  if (window.routingControl) {
    map.removeControl(window.routingControl);
  }

  window.routingControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: true,
  }).addTo(map);

  displayRecommendation(randomHotel, randomFood, randomTourism);
}

// Función para mostrar la recomendación
function displayRecommendation(hotel, food, tourism) {
  const recommendationDiv = document.getElementById("recommendation");
  recommendationDiv.innerHTML = `
                <div class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">Recomendación de Ruta</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Ruta sugerida</h6>
                    <p class="card-text"><strong>Hotel:</strong> ${hotel.name}</p>
                    <p class="card-text"><strong>Restaurante:</strong> ${food.name}</p>
                    <p class="card-text"><strong>Lugar Turístico:</strong> ${tourism.name}</p>
                    <a href="#" class="card-link" onclick="goToLocation(${hotel.lat}, ${hotel.lon})">Ir al Hotel</a>
                    <a href="#" class="card-link" onclick="goToLocation(${food.lat}, ${food.lon})">Ir al Restaurante</a>
                    <a href="#" class="card-link" onclick="goToLocation(${tourism.lat}, ${tourism.lon})">Ir al Lugar Turístico</a>
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

/* var marker = null;
var userLocation; // Variable para almacenar la ubicación del usuario
var selectedDestination; // Variable para almacenar la ubicación de destino seleccionada
var routingControl; */

/* -MAPA 2-------------------------------------------------------------------------------------- */
/* var map2 = L.map("map2", {
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
 */

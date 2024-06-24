var map5 = L.map("map5", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 14,
  maxZoom: 18,
  minZoom: 14,
});

// Agregar tile layer mapa base desde openstreetmap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map5);
// Definir ubicaciones con detalles adicionales

document.addEventListener("DOMContentLoaded", function () {
  var promedio = 0;
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
        let marker = L.marker(data.coord, { icon: markerIcon }).addTo(map5);

        marker.on("click", function () {
          var listaComentarios = document.getElementById("lista_comentarios");
          listaComentarios.innerHTML = "";
          var id_punto = document.getElementById("id_punto");
          id_punto.value = data.id;
          var prom_rating = 0;
          fetch("/obtener_comentario/")
            .then((response) => response.json())
            .then((datas) => {
              var comentarios = datas;
              let valores = [];
              promedio = 0;
              comentarios.forEach(function (comen) {
                if (comen.punto_id == data.id) {
                  prom_rating += comen.rating;
                  valores.push(comen.rating);
                  var comentarioDiv = document.createElement("div");
                  comentarioDiv.classList.add("comentario");
                  // Construir el HTML del comentario
                  comentarioDiv.innerHTML = `
                  <div class="card" style="margin: 20px; background-image: none; background-color: transparent; color: white; border: 1px solid white; border-radius: 10px; padding: 10px;">
                    <p style="margin: 1px; font-weight: bold; text-align: left;">${
                      comen.usuario
                    } - ${formatearFecha(comen.fecha_hora)} - Calificacion: ${
                    comen.rating
                  }/5</p>
                    <p style="margin: 1px; text-align: left;">${
                      comen.comentario_user
                    }</p>
                </div>
                    `;
                  // Agregar el comentario al contenedor
                  listaComentarios.appendChild(comentarioDiv);
                }
              });
              promedio = prom_rating / valores.length;
              console.log(promedio);
              showLocationCard(data, promedio);
            });
        });
      });
    });
});

function formatearFecha(fechaISO) {
  var fecha = new Date(fechaISO);
  var opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
  var opcionesHora = { hour: "numeric", minute: "numeric", second: "numeric" };
  var fechaFormateada =
    fecha.toLocaleDateString("es-ES", opcionesFecha) +
    " " +
    fecha.toLocaleTimeString("es-ES", opcionesHora);
  return fechaFormateada;
}

function showLocationCard(location, promedio) {
  if (promedio == NaN) {
    promedio = 0;
  }
  var elemento = document.getElementById("formulario");
  if (elemento.style.display === "none") {
    elemento.style.display = "block"; // Muestra el elemento
  }

  let container = document.getElementById("location-card-container");
  container.innerHTML = "";

  let card = document.createElement("div");
  card.className = "location-card";

  let cardContent = `
    <div class="card" style="background-image: none;">
        <div class="card-header text-center">
            <h3>${location.name}</h3>
            <h5>Calificacion: ${promedio}</h5>
        </div>
        <div class="row pt-4 px-4">
            <div class="col-5 text-center">
                <img src="${location.imagen_ruta}" alt="${location.name}" width="160px">
            </div>
            <div class="col-7">
                <p style="color: black; font-size:14px">${location.descripcion}</p>

            </div>
        </div>
    </div>
    `;
  card.innerHTML = cardContent;
  container.appendChild(card);
}

var osm = L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map5);
var google = L.tileLayer("https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}");
var carto = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
);

// Crear un control de capas para los mapas base
var mapasBase = {
  OpenStreet: osm,
  Google: google,
  Carto: carto,
};

// Crear un control de capas para los mapas base
L.control
  .layers(mapasBase, null, {
    position: "topright",
    collapsed: false,
  })
  .addTo(map5);

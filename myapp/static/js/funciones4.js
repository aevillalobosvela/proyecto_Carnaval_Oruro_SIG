var marker3;
// Inicializa el mapa
var map3 = L.map("map3", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 14,
  maxZoom: 18,
  minZoom: 14,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map3);

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
}).addTo(map3);

map3.on("click", function (e) {
  // Set the input values
  $("#mi_id_coord_lat").val(e.latlng.lat.toFixed(8));
  $("#mi_id_coord_lng").val(e.latlng.lng.toFixed(8));

  // If there is an existing marker, remove it
  if (marker3) {
    map3.removeLayer(marker3);
  }

  // Add a new marker at the clicked location
  marker3 = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map3);
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("/obtener_punto_custom/")
    .then((response) => response.json())
    .then((data) => {
      puntos = data;
      puntos.forEach(function (data) {
        var nombre = data.name;
        var descripcion = data.descripcion;
        var imagen = "/static/img/generaruta/fav.png";
        L.marker(data.coord)
          .bindPopup(
            `<div>
            <h3 class="text-center">${nombre}</h3>
            <p class="text-center" style="color: black;">${descripcion}</p>
            <div class="text-center">
                <img src="${imagen}" alt="Imagen del lugar" style="width:80px;height:auto;">
            </div>
            <div class="text-center mt-2">
                <button class="btn btn-danger btn-sm" onclick="eliminarMarcador(${data.id})">Eliminar</button>
            </div>
            </div>`
          )
          .openPopup()
          .addTo(map3);
      });
    });
});

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Buscar la cookie que comienza con el nombre 'csrftoken'
      if (cookie.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function eliminarMarcador(puntoId) {
  $.ajax({
    url: "/mis_marcadores/eliminar_punto_custom/" + puntoId + "/",
    type: "DELETE",
    headers: {
      "X-CSRFToken": getCookie("csrftoken"), // Obtener el token CSRF de las cookies
    },
    success: function (response) {
      if (response.status === "success") {
        alert("Punto eliminado con éxito.");
        location.reload(); // Recargar la página después de eliminar
      } else {
        alert("Hubo un error al eliminar el punto.");
      }
    },
    error: function () {
      alert("Hubo un error al eliminar el punto.");
    },
  });
}

var marker = null;
var userLocation; // Variable para almacenar la ubicación del usuario
var selectedDestination; // Variable para almacenar la ubicación de destino seleccionada
var routingControl;

$(document).ready(function () {
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
    $("#icon").toggleClass("fa-arrow-circle-left fa-arrow-circle-right");
  });
});

/* -MAPA 1-------------------------------------------------------------------------------------- */

var map1 = L.map("map1", {
  center: [-17.964138034171146, -67.10734251787665],
  zoom: 15,
  maxZoom: 18,
  minZoom: 14,
});

L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
).addTo(map1);

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
}).addTo(map1);

var usuarioIcon = L.divIcon({
  html: '<i class="fa fa-map-marker fa-3x"></i>',
  className: "usuario-icon",
});

function onLocationFound(e) {
  userLocation = e.latlng;
  // Agregar un marcador en la ubicación del usuario
  var marker = L.marker(e.latlng, { icon: usuarioIcon })
    .addTo(map1)
    .bindPopup("Usted esta aqui")
    .openPopup();
  // Centrar el mapa en la ubicación del usuario
  map1.setView(e.latlng, 15);
}

// Función para manejar errores de geolocalización
function onLocationError(e) {
  alert(e.message);
}

// Solicitar la ubicación del usuario
map1.on("locationfound", onLocationFound);
map1.on("locationerror", onLocationError);

// Iniciar la solicitud de geolocalización
map1.locate({ setView: true, maxZoom: 16 });

function generateRoute() {
  if (!userLocation || !selectedDestination) {
    alert("Usuario o destino no encontrados");
    return;
  }
  if (routingControl) {
    map1.removeControl(routingControl);
  }
  routingControl = L.Routing.control({
    waypoints: [userLocation, selectedDestination],
    routeWhileDragging: true,
  }).addTo(map1);
}

document.getElementById("routeButton").addEventListener("click", generateRoute);

function adjustCoordinatesToRight(coords, offset) {
  return [coords[0], coords[1] + offset];
}

/* -LINEA PRINCIPAL-------------------------------------------------------------------------------------- */
var inicio_mark = L.marker([-17.957698858097284, -67.10479645507664]).addTo(
  map1
);
inicio_mark.bindPopup("Inicio del recorrido");

var final_mark = L.marker([-17.967469390470484, -67.11855552699116]).addTo(
  map1
);
final_mark.bindPopup("Final del recorrido");

var rec_carnaval = [
  [-17.957698858097284, -67.10479645507664],
  [-17.96469668892355, -67.10687022162124],
  [-17.968979296085056, -67.10805794178015],
  [-17.971660934457464, -67.1088268299442],
  [-17.970104038282503, -67.11445157524199],
  [-17.969322327621455, -67.11420033430277],
  [-17.96907055246133, -67.11499498440033],
  [-17.9699337237225, -67.11526711673427],
  [-17.969099621642712, -67.11786137691192],
  [-17.968254722820056, -67.1175735136206],
  [-17.968051125084976, -67.11806238908132],
  [-17.96717328392045, -67.11781577280718],
  [-17.9670938382334, -67.11808266361845],
  [-17.967109421355303, -67.11827014304588],
  [-17.967469390470484, -67.11855552699116],
];

var polylineOptions = {
  color: "orange", // Color de la línea
  weight: 8, // Ancho de la línea en píxeles
  opacity: 0.7, // Opacidad de la línea
  lineCap: "round", // Estilo del final de la línea
  lineJoin: "round", // Estilo de la unión de líneas
};

var carnaval = L.polyline(rec_carnaval, polylineOptions).addTo(map1);

/* -puntos de interes-------------------------------------------------------------------------------------- */

var saludIcon = L.divIcon({
  html: '<i class="fa fa-plus-square fa-2x"></i>',
  className: "salud-icon",
});

var seguridadIcon = L.icon({
  iconUrl: "static/img/mapa/logo_policia.png", // Ruta relativa a la imagen local
  iconSize: [38, 38], // Tamaño del icono [ancho, alto]
  iconAnchor: [19, 38], // Punto del icono que se corresponderá con la posición del marcador
  popupAnchor: [0, -38],
});

var depositoIcon = L.divIcon({
  html: '<i class="fa fa-dumpster fa-2x"></i>',
  className: "deposito-icon",
});

var pasoIcon = L.divIcon({
  html: '<span class="fa-stack fa-lg"><i class="fa fa-circle-o fa-stack-2x"></i><i class="fa fa-walking fa-stack-1x"></i>',
  className: "paso-icon",
});

var salud = [
  {
    coord: [-17.95673328212476, -67.10514358751995],
    titulo: "Puesto de Salud",
    direccion: "Sector Avenida Heroes del Chaco",
    imagen_ruta: "static/img/mapa/salud/salud1.jpg",
  },
  {
    coord: [-17.96024064600984, -67.10672157609262],
    titulo: "Puesto de Salud",
    direccion: "Avenida Villaroel y Velasco Galvarro",
    imagen_ruta: "static/img/mapa/salud/salud7.png",
  },
  {
    coord: [-17.961972664664998, -67.10711606163198],
    titulo: "Puesto de Salud",
    direccion: "Velasco Galvarro entre Aroma y Rodriguez",
    imagen_ruta: "static/img/mapa/salud/salud3.jpg",
  },
  {
    coord: [-17.9649961858182, -67.10797251964217],
    titulo: "Puesto de Salud",
    direccion: "Velasco Galvarro entre Herrera y 1ro de noviembre",
    imagen_ruta: "static/img/mapa/salud/salud2.jpeg",
  },
  {
    coord: [-17.96752062510037, -67.10642871368316],
    titulo: "Puesto de Salud",
    direccion: "Rajka Bakovic entre Caro y Montecinos",
    imagen_ruta: "static/img/mapa/salud/salud4.jfif",
  },
  {
    coord: [-17.967350696772108, -67.1090570216887],
    titulo: "Puesto de Salud",
    direccion: "Caro entre Pagador y Velasco Galvarro",
    imagen_ruta: "static/img/mapa/salud/salud10.jpg",
  },
  {
    coord: [-17.96830949637342, -67.10834253603726],
    titulo: "Puesto de Salud",
    direccion: "Cochabamba ente Velasco Galvarro y Av. 6 de agosto",
    imagen_ruta: "static/img/mapa/salud/salud9.jpg",
  },
  {
    coord: [-17.971001611183457, -67.10789866090145],
    titulo: "Puesto de Salud",
    direccion: "Adolfo Mier entre Av. 6 de agosto y rajka Bakovic",
    imagen_ruta: "static/img/mapa/salud/salud8.jpeg",
  },
  {
    coord: [-17.971851152980786, -67.11084594456847],
    titulo: "Puesto de Salud",
    direccion: "Adolfo Mier entre Av. 6 de agosto y Rajka Bakovic",
    imagen_ruta: "static/img/mapa/salud/salud7.png",
  },
  {
    coord: [-17.970479752967943, -67.11052697142715],
    titulo: "Puesto de Salud",
    direccion: "Pagador y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud6.jpg",
  },
  {
    coord: [-17.97106395970095, -67.11434172990847],
    titulo: "Puesto de Salud",
    direccion: "Pagador y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud5.png",
  },
  {
    coord: [-17.968831317791306, -67.11491280866207],
    titulo: "Puesto de Salud",
    direccion: "Presidente Montes entre Junin y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud4.jfif",
  },
  {
    coord: [-17.967959273763388, -67.11557586819224],
    titulo: "Puesto de Salud",
    direccion: "Junin y Washington",
    imagen_ruta: "static/img/mapa/salud/salud3.jpg",
  },
  {
    coord: [-17.969046738340957, -67.11670863651712],
    titulo: "Puesto de Salud",
    direccion: "Camacho entre Bolivar y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud2.jpeg",
  },
  {
    coord: [-17.96837117245009, -67.11745703527103],
    titulo: "Puesto de Salud",
    direccion: "Petot y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud10.jpg",
  },
  {
    coord: [-17.970575558772797, -67.11839044916223],
    titulo: "Puesto de Salud",
    direccion: "Petot entre Murguia y Sucre",
    imagen_ruta: "static/img/mapa/salud/salud9.jpg",
  },
  {
    coord: [-17.968391571163625, -67.11857283003275],
    titulo: "Puesto de Salud",
    direccion: "Linares entre Bolivar y Adolfo Mier",
    imagen_ruta: "static/img/mapa/salud/salud5.png",
  },
];

var seguridad = [
  {
    coord: [-17.960904600543504, -67.10464288776342],
    titulo: "Puesto Policial",
    direccion: "Avenida Villaroel y Rajka Bakovic",
    imagen_ruta: "static/img/mapa/policia/policia1.jpg",
  },
  {
    coord: [-17.96997219875942, -67.10608421753413],
    titulo: "Puesto Policial",
    direccion: "Avenida Brasil esquina Ayacucho",
    imagen_ruta: "static/img/mapa/policia/policia2.png",
  },
  {
    coord: [-17.97004282806646, -67.10925108756975],
    titulo: "Puesto Policial",
    direccion: "Junin esquina Velasco Galvarro",
    imagen_ruta: "static/img/mapa/policia/policia3.png",
  },
  {
    coord: [-17.969577303263794, -67.11562158873598],
    titulo: "Puesto Policial",
    direccion: "Bolivar entre Washington y Presidente Montes",
    imagen_ruta: "static/img/mapa/policia/policia4.png",
  },
];

var deposito = [
  {
    coord: [-17.958162222453723, -67.10383872615658],
    titulo: "Deposito de residuos",
    direccion: "Rajka Bakovic altura Maestranza de trenes",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },

  {
    coord: [-17.961871638556104, -67.10485530735654],
    titulo: "Deposito de residuos",
    direccion: "Rajka Bakovic y Aroma B",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.962939698438237, -67.10738917535684],
    titulo: "Deposito de residuos",
    direccion: "Velasco Galvarro entre Ignacion Leon y Rodriguez",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.96438935918436, -67.10557386374819],
    titulo: "Deposito de residuos",
    direccion: "Rajka Bakovic entre 1ro de noviembre e Ignacio Leon",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.966234141181957, -67.10608421871093],
    titulo: "Deposito de residuos",
    direccion: "Rajka Bakovic entre Montecinos y Herrera",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.96690164408122, -67.10857219663252],
    titulo: "Deposito de residuos",
    direccion: "Velasco Galvarro entre Caro y Montecinos",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.96985081775946, -67.10975875403427],
    titulo: "Deposito de residuos",
    direccion: "Junin entre Pagador y Velasco Galvarro",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.972518647939644, -67.10786038993952],
    titulo: "Deposito de residuos",
    direccion: "Rajka Bakovic entre Sucre y Bolivar",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.972203105769392, -67.11069283995452],
    titulo: "Deposito de residuos",
    direccion: "Sucre y Pagador",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.969364874871864, -67.11122856882136],
    titulo: "Deposito de residuos",
    direccion: "Junin y Potosi",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.971282410997027, -67.11338482364664],
    titulo: "Deposito de residuos",
    direccion: "Sucre entre Soria Galvarro y 6 de octubre",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.968427981363902, -67.11412790694166],
    titulo: "Deposito de residuos",
    direccion: "Junin entre Presidente Montes y La Plata",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.970793256204615, -67.11562528581392],
    titulo: "Deposito de residuos",
    direccion: "Sucre y Presidente Montes",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.967905771918094, -67.11646492647472],
    titulo: "Deposito de residuos",
    direccion: "Junin y Camacho",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
  {
    coord: [-17.97014077161978, -67.11760220056858],
    titulo: "Deposito de residuos",
    direccion: "Sucre entre Petot y Camacho",
    imagen_ruta: "static/img/mapa/deposito1.jpg",
  },
  {
    coord: [-17.96919780574735, -67.11965645278329],
    titulo: "Deposito de residuos",
    direccion: "Baptista entre Sucre y Bolivar",
    imagen_ruta: "static/img/mapa/deposito2.jpg",
  },
];

var paso = [
  {
    coord: [-17.960267941563636, -67.10566629779373],
    titulo: "Paso Peatonal",
    direccion: "Avenida Villarroel",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.961438635889948, -67.10597809898691],
    titulo: "Paso Peatonal",
    direccion: "Calle Aroma A",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.96232490570489, -67.10624536653067],
    titulo: "Paso Peatonal",
    direccion: "Calle Rodriguez",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.963638247407577, -67.10661875207893],
    titulo: "Paso Peatonal",
    direccion: "Calle Jose Ignacio Leon",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.96469277359838, -67.10692629832128],
    titulo: "Paso Peatonal",
    direccion: "Calle 1ro de Noviembre",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.96760141424165, -67.107748519253],
    titulo: "Paso Peatonal",
    direccion: "Calle Caro",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.96931290786419, -67.10821900347709],
    titulo: "Paso Peatonal",
    direccion: "Calle Ayacucho",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.970145425340334, -67.10849503765594],
    titulo: "Paso Peatonal",
    direccion: "Calle Junin",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.971549712202382, -67.10889715033233],
    titulo: "Paso Peatonal",
    direccion: "Calle Bolivar",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.970761641932842, -67.11191130908375],
    titulo: "Paso Peatonal",
    direccion: "Calle Potosi",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.970600745648813, -67.1127185622055],
    titulo: "Paso Peatonal",
    direccion: "Calle 6 de Octubre",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.970291361872633, -67.11368578897864],
    titulo: "Paso Peatonal",
    direccion: "Calle Soria Galvarro",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.969290201345903, -67.11425703612471],
    titulo: "Paso Peatonal",
    direccion: "Adolfo Mier y La Plata",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.969038883539426, -67.11503249077249],
    titulo: "Paso Peatonal",
    direccion: "Adolfo Mier y Presidente Montes",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
  {
    coord: [-17.969006313356555, -67.11793503846157],
    titulo: "Paso Peatonal",
    direccion: "Calle Petot",
    imagen_ruta: "static/img/mapa/paso1.jpg",
  },
  {
    coord: [-17.967101796362787, -67.1178681017945],
    titulo: "Paso Peatonal",
    direccion: "Calle Junin",
    imagen_ruta: "static/img/mapa/paso2.jpg",
  },
];

var saludMarkers = L.layerGroup();
var seguridadMarkers = L.layerGroup();
var depositoMarkers = L.layerGroup();
var pasoMarkers = L.layerGroup();

// Añadir marcadores a las capas correspondientes

salud.forEach(function (data) {
  var mark_salud = L.marker(data.coord, { icon: saludIcon }).addTo(
    saludMarkers
  );

  mark_salud.on("click", function () {
    var adjustedCoord = adjustCoordinatesToRight(data.coord, 0.003); // Ajustar 0.005 grados a la derecha
    map1.setView(adjustedCoord, 16);
    document.getElementById("titulo-info").innerHTML = data.titulo;
    document.getElementById("marker-info").innerHTML = data.direccion;
    document.getElementById("marker-image").src = data.imagen_ruta;
    var card = document.getElementById("card-info");
    card.style.display = "block";
    selectedDestination = data.coord;
  });
});

seguridad.forEach(function (data) {
  var mark_seguridad = L.marker(data.coord, { icon: seguridadIcon }).addTo(
    seguridadMarkers
  );

  mark_seguridad.on("click", function () {
    var adjustedCoord = adjustCoordinatesToRight(data.coord, 0.003); // Ajustar 0.005 grados a la derecha
    map1.setView(adjustedCoord, 16);
    document.getElementById("titulo-info").innerHTML = data.titulo;
    document.getElementById("marker-info").innerHTML = data.direccion;
    document.getElementById("marker-image").src = data.imagen_ruta;
    var card = document.getElementById("card-info");
    card.style.display = "block";
    selectedDestination = data.coord;
  });
});

deposito.forEach(function (data) {
  var mark_deposito = L.marker(data.coord, { icon: depositoIcon }).addTo(
    depositoMarkers
  );

  mark_deposito.on("click", function () {
    var adjustedCoord = adjustCoordinatesToRight(data.coord, 0.003); // Ajustar 0.005 grados a la derecha
    map1.setView(adjustedCoord, 16);
    document.getElementById("titulo-info").innerHTML = data.titulo;
    document.getElementById("marker-info").innerHTML = data.direccion;
    document.getElementById("marker-image").src = data.imagen_ruta;
    var card = document.getElementById("card-info");
    card.style.display = "block";
    selectedDestination = data.coord;
  });
});

paso.forEach(function (data) {
  var mark_paso = L.marker(data.coord, { icon: pasoIcon }).addTo(pasoMarkers);
  mark_paso.on("click", function () {
    var adjustedCoord = adjustCoordinatesToRight(data.coord, 0.003); // Ajustar 0.005 grados a la derecha
    map1.setView(adjustedCoord, 16);
    document.getElementById("titulo-info").innerHTML = data.titulo;
    document.getElementById("marker-info").innerHTML = data.direccion;
    document.getElementById("marker-image").src = data.imagen_ruta;
    var card = document.getElementById("card-info");
    card.style.display = "block";
    selectedDestination = data.coord;
  });
});

// Añadir las capas de marcadores al mapa
saludMarkers.addTo(map1);
seguridadMarkers.addTo(map1);
depositoMarkers.addTo(map1);
pasoMarkers.addTo(map1);

// Añadir control de capas al mapa
var overlayMaps = {
  '<i class="fa fa-plus-square fa-lg salud-icon"></i> Puestos de Salud':
    saludMarkers,
  "Puestos de policia": seguridadMarkers,
  '<i class="fa fa-dumpster fa-lg deposito-icon"></i>  Depositos de basura':
    depositoMarkers,
  '<i class="fa fa-walking fa-lg paso-icon"></i> Paso peatonal': pasoMarkers,
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map1);

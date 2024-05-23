console.log("funciona");
var marker = null;

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

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map1);

document
  .getElementById("select-location")
  .addEventListener("change", function (e) {
    let coords = e.target.value.split(",");
    map1.flyTo(coords, 17);
    if (marker) {
      map1.removeLayer(marker);
    }
    marker = L.marker(e.target.value.split(",")).addTo(map1);
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
}).addTo(map1);

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
  [-17.97155501626077, -67.10880478849505],
  [-17.970195654803433, -67.11436268976651],
  [-17.969346773716726, -67.11412016972848],
  [-17.969093423922775, -67.11491600040829],
  [-17.969954496640337, -67.11520016457632],
  [-17.969191749928235, -67.11788726049843],
  [-17.968340812675248, -67.11756653470802],
  [-17.968051125084976, -67.11806238908132],
  [-17.9672320383532, -67.11782994692255],
  [-17.96705558543468, -67.11808110926447],
  [-17.967469390470484, -67.11855552699116],
];

var polylineOptions = {
  color: "red", // Color de la línea
  weight: 8, // Ancho de la línea en píxeles
  opacity: 0.7, // Opacidad de la línea
  lineCap: "round", // Estilo del final de la línea
  lineJoin: "round", // Estilo de la unión de líneas
};

var carnaval = L.polyline(rec_carnaval, polylineOptions).addTo(map1);

/* -puntos de interes-------------------------------------------------------------------------------------- */

var saludIcon = L.divIcon({
  html: '<i class="fa fa-plus-square fa-2x"></i>',
  className: 'salud-icon'
});

var seguridadIcon = L.divIcon({
  html: '<i class="fa fa-person-military-pointing fa-2x"></i>',
  className: 'seguridad-icon'
});

var depositoIcon = L.divIcon({
  html: '<i class="fa fa-dumpster fa-2x"></i>',
  className: 'deposito-icon'
});

var pasoIcon = L.divIcon({
  html: '<i class="fa fa-road-barrier fa-2x"></i>',
  className: 'paso-icon'
});

var salud = [
  [-17.95673328212476, -67.10514358751995],
  [-17.96024064600984, -67.10672157609262],
  [-17.961972664664998, -67.10711606163198],
  [-17.9649961858182, -67.10797251964217],
  [-17.96752062510037, -67.10642871368316],
  [-17.967350696772108, -67.1090570216887],
  [-17.96830949637342, -67.10834253603726],
  [-17.971001611183457, -67.10789866090145],
  [-17.971851152980786, -67.11084594456847],
  [-17.970479752967943, -67.11052697142715],
  [-17.97106395970095, -67.11434172990847],
  [-17.968831317791306, -67.11491280866207],
  [-17.967959273763388, -67.11557586819224],
  [-17.969046738340957, -67.11670863651712],
  [-17.96837117245009, -67.11745703527103],
  [-17.970575558772797, -67.11839044916223],
  [-17.968391571163625, -67.11857283003275],
];

var seguridad = [
  [-17.960904600543504, -67.10464288776342],
  [-17.96997219875942, -67.10608421753413],
  [-17.97004282806646, -67.10925108756975],
  [-17.969577303263794, -67.11562158873598],
];

var deposito = [
  [-17.958162222453723, -67.10383872615658],
  [-17.961871638556104, -67.10485530735654],
  [-17.962939698438237, -67.10738917535684],
  [-17.96438935918436, -67.10557386374819],
  [-17.966234141181957, -67.10608421871093],
  [-17.96690164408122, -67.10857219663252],
  [-17.96985081775946, -67.10975875403427],
  [-17.972518647939644, -67.10786038993952],
  [-17.972203105769392, -67.11069283995452],
  [-17.969364874871864, -67.11122856882136],
  [-17.971282410997027, -67.11338482364664],
  [-17.968427981363902, -67.11412790694166],
  [-17.970793256204615, -67.11562528581392],
  [-17.967905771918094, -67.11646492647472],
  [-17.97014077161978, -67.11760220056858],
  [-17.96919780574735, -67.11965645278329],
];

var paso = [
  [-17.960457160365724, -67.10559877720537],
  [-17.961438635889948, -67.10597809898691],
  [-17.96236237096946, -67.10617534702816],
  [-17.963661366993843, -67.10653949819036],
  [-17.96469277359838, -67.10692629832128],
  [-17.96765412046922, -67.10757700390268],
  [-17.969413910067992, -67.10810010779102],
  [-17.97023701919334, -67.10840901416204],
  [-17.971656969282176, -67.1088683395914],
  [-17.970845512433478, -67.11182823593387],
  [-17.970663461980536, -67.11261928320972],
  [-17.970663461882392, -67.11263204204953],
  [-17.97038431574108, -67.11351239986266],
  [-17.969354813072535, -67.11410084359146],
  [-17.96912309779381, -67.11493987163098],
  [-17.967276180927286, -67.11778204170197],
];

var saludMarkers = L.layerGroup();
var seguridadMarkers = L.layerGroup();
var depositoMarkers = L.layerGroup();
var pasoMarkers = L.layerGroup();

// Añadir marcadores a las capas correspondientes

salud.forEach(function (coord) {
  L.marker(coord, { icon: saludIcon }).bindPopup('Puesto de salud').addTo(saludMarkers);
});

seguridad.forEach(function (coord) {
  L.marker(coord, { icon: seguridadIcon }).bindPopup("Puesto policial").addTo(seguridadMarkers);
});

deposito.forEach(function (coord) {
  L.marker(coord, { icon: depositoIcon }).bindPopup("Deposito de basura").addTo(depositoMarkers);
});

paso.forEach(function (coord) {
  L.marker(coord, { icon: pasoIcon }).bindPopup("Paso peatonal").addTo(pasoMarkers);
});

// Añadir las capas de marcadores al mapa
saludMarkers.addTo(map1);
seguridadMarkers.addTo(map1);
depositoMarkers.addTo(map1);
pasoMarkers.addTo(map1);

// Añadir control de capas al mapa
var overlayMaps = {
  "Puestos de salud": saludMarkers,
  "Puestos de policia": seguridadMarkers,
  "Depositos de basura": depositoMarkers,
  "Paso peatonal": pasoMarkers
};

L.control.layers(null, overlayMaps).addTo(map1);

console.log("funciona33");

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

// Definir ubicaciones con detalles adicionales
let locations = [
  // Hoteles
  {
    coords: [-17.96557445732872, -67.10635546869543],
    name: "Hostal Graciela",
    category: "hoteles",
    description:
      "Disfrute de una estancia tranquila y acogedora en el Hostal Graciela, donde la hospitalidad y el confort se combinan para brindarle una experiencia inolvidable. Con habitaciones cómodas y servicios excepcionales.<br><br> Rango de precios (por dia):<br>Habitacion simple - 154 Bs.<br>Habitacion suite - 214 Bs.",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.96236147092776, -67.10278318404016],
    name: "Hotel Glorioso",
    category: "hoteles",
    description:
      "Sumérjase en la elegancia y el encanto del Hotel Glorioso, donde el lujo se combina con la comodidad para crear un ambiente verdaderamente excepcional. Desde nuestras lujosas habitaciones hasta nuestras instalaciones de primera clase.<br><br> Rango de precios (por dia):<br>Habitacion estandar - 204 Bs.<br>Habitacion suite - 346 Bs.<br>Habitacion Familiar - 691 Bs.",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.962245388504577, -67.10661148774666],
    name: "Gran Hotel Bolivia",
    category: "hoteles",
    description:
      "Descubra el verdadero significado de la hospitalidad boliviana en el Gran Hotel Bolivia, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia única en su clase. Con una ubicación céntrica y servicios de clase mundial, nuestro hotel es la elección perfecta.<br><br> Rango de precios (por dia):<br>Habitacion simple - 194 Bs.<br>Habitacion Luxury - 454 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.969128960958876, -67.11433118959974],
    name: "Hotel Plaza",
    category: "hoteles",
    description:
      "Experimente el lujo y la comodidad en el Hotel Plaza, donde cada detalle está cuidadosamente diseñado para ofrecerle una estancia inolvidable. Desde nuestras elegantes habitaciones hasta nuestras instalaciones de primera clase, nuestro hotel es el refugio perfecto en el corazón de la ciudad.<br><br> Rango de precios (por dia):<br>Habitacion simple - 314 Bs.<br>Habitacion suite - 714 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.966435243509885, -67.11511642884702],
    name: "Hotel Briggs",
    category: "hoteles",
    description:
      "Sumérjase en la sofisticación y el estilo en el Hotel Briggs, donde la elegancia se encuentra con la comodidad para brindarle una experiencia verdaderamente excepcional. Con una ubicación privilegiada y servicios de primera clase, nuestro hotel es el destino ideal para viajeros exigentes.<br><br> Rango de precios (por dia):<br>Habitacion simple - 148 Bs.<br>Habitacion suite - 254 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.966999837934388, -67.11797146632333],
    name: "Hotel Virgen del Socavon",
    category: "hoteles",
    description:
      "Descubra la belleza y la serenidad en el HOTEL VIRGEN DEL SOCAVON, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia única en su clase. Con una ubicación privilegiada y servicios excepcionales, nuestro hotel es el refugio perfecto en el corazón de la ciudad.<br><br> Rango de precios (por dia):<br>Habitacion individual - 221 Bs.<br>Habitacion doble - 311 Bs.<br>Habitacion suite - 415 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.969679495368712, -67.11468300546305],
    name: "Solárium Restaurante Hotel Edén",
    category: "hoteles",
    description:
      "Experimente la tranquilidad y el confort en el Solárium Restaurante Hotel Edén, donde la naturaleza y la hospitalidad se combinan para brindarle una estancia verdaderamente rejuvenecedora. Con vistas impresionantes y servicios excepcionales, nuestro hotel es el destino perfecto para aquellos que buscan escapar del ajetreo y el bullicio de la vida cotidiana.<br><br> Rango de precios (por dia):<br>Habitacion simple - 271 Bs.<br>Habitacion suite - 551 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.97066614215071, -67.11287912028908],
    name: "Hotel Houston",
    category: "hoteles",
    description:
      "Descanse y relájese en el Hotel Houston, donde la comodidad y la conveniencia se encuentran para brindarle una experiencia de alojamiento inigualable. Con habitaciones espaciosas y servicios excepcionales, nuestro hotel es el refugio perfecto para viajeros de negocios y placer por igual.<br><br> Rango de precios (por dia):<br>Habitacion simple - 174 Bs.<br>Habitacion suite - 251 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.96133155320207, -67.10812583378078],
    name: "Residencial Hinojosa",
    category: "hoteles",
    description:
      "Sumérjase en la historia y el encanto de la Residencial Hinojosa, donde la tradición se encuentra con la modernidad para ofrecerle una experiencia de alojamiento única. Con una ubicación céntrica y servicios excepcionales, nuestro hotel es el destino perfecto para explorar todas las maravillas que nuestra ciudad tiene para ofrecer.<br><br> Rango de precios (por dia):<br>Habitacion simple - 124 Bs.<br>Habitacion suite - 201 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.97079249639655, -67.11288998959968],
    name: "Hotel Sucre Palace",
    category: "hoteles",
    description:
      "Descubra el lujo y la elegancia en el Hotel Sucre Palace, donde el estilo y la sofisticación se combinan para brindarle una experiencia de alojamiento excepcional. Con habitaciones lujosas y servicios de primera clase, nuestro hotel es el refugio perfecto para los viajeros más exigentes.<br><br> Rango de precios (por dia):<br>Habitacion simple - 301 Bs.<br>Habitacion Deluxe - 611 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.9710297289956, -67.11040125520366],
    name: "Gran Hotel Galaxia",
    category: "hoteles",
    description:
      "Sumérjase en el lujo y la comodidad en el Gran Hotel Galaxia, donde cada detalle está cuidadosamente diseñado para ofrecerle una experiencia de alojamiento inolvidable. Desde nuestras elegantes habitaciones hasta nuestras instalaciones de clase mundial, nuestro hotel es el destino ideal para aquellos que buscan una escapada de lujo en el corazón de la ciudad.<br><br> Rango de precios (por dia):<br>Habitacion simple - 271 Bs.<br>Habitacion suite - 551 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },
  {
    coords: [-17.96796209935517, -67.10727228033335],
    name: "Hotel Monarca",
    category: "hoteles",
    description:
      "Experimente la elegancia y el encanto en el Hotel Monarca, donde la comodidad se encuentra con la sofisticación para brindarle una experiencia de alojamiento excepcional. Con una ubicación privilegiada y servicios de primera clase, nuestro hotel es el refugio perfecto.<br><br> Rango de precios (por dia):<br>Habitacion simple - 219 Bs.<br>Habitacion suite - 414 Bs",
    image: "/static/img/conoceoruro/hot.png",
  },

  // Restaurantes
  {
    coords: [-17.970316344905434, -67.11377867610823],
    name: "Restaurante El Negrito",
    category: "restaurantes",
    description:
      "Restaurant el Negrito <br><br> Sirve: Comida peruana, Comida rápida, Desayuno, Almuerzo, Cenas.<br><br>Rango de precios: 20 Bs. - 55 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.96870930117551, -67.11460981164859],
    name: "La Casona",
    category: "restaurantes",
    description:
      "Restaurant La Casona <br><br> Sirve: Variedad de Pizzas, similares, opcion vegetariana.<br><br>Rango de precios: 27 Bs. - 60 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.973590414724292, -67.1109544668418],
    name: "Restaurant Nayjama",
    category: "restaurantes",
    description:
      "Restaurant Nayjama <br><br> Sirve: Almuerzo, Cenas, comida tipica, tradicional de la region, platos especiales.<br><br>Rango de precios: 20 Bs. - 55 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.97040545305779, -67.11318575768243],
    name: "Factory Xpress",
    category: "restaurantes",
    description:
      "Factory Xpress <br><br> Sirve: Comida rápida, hamburguesas, alitas de pollo, platos especiales, cortes de carne.<br><br>Rango de precios: 41 Bs. - 70 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.969960995628657, -67.11012398774643],
    name: "Restaurant Pagador",
    category: "restaurantes",
    description:
      "Restaurant Pagador <br><br> Sirve:Almuerzo, Cenas, almuerzo completo familiar, platos extras.<br><br>Rango de precios: 15 Bs. - 25 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.97176463310805, -67.11167180731627],
    name: "Restaurant Vegetariano Govinda",
    category: "restaurantes",
    description:
      "Restaurant Vegetariano Govinda <br><br> Sirve: Almuerzo, comida vegetariana, platos extras.<br><br>Rango de precios: 14 Bs. - 20 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.96918993343915, -67.11670964541871],
    name: "Bravo's Pizza",
    category: "restaurantes",
    description:
      "Bravo's Pizza <br><br> Sirve: Comida rápida, pizzas, similares.<br><br>Rango de precios: 31 Bs. - 90 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.95126278008152, -67.10876464048772],
    name: "Charquekan Orureño 'El Puente'",
    category: "restaurantes",
    description:
      "Charquekan Orureño 'El Puente' <br><br> Sirve: Almuerzo, Comida tradicional de la region, Charquekan.<br><br>Rango de precios: 40 Bs. - 70 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.96550514868362, -67.10527572080795],
    name: "Churrasqueria Santa Brasa",
    category: "restaurantes",
    description:
      "Churrasqueria Santa Brasa <br><br> Sirve: Almuerzo, platos de la region, platillos especiales, parrilla.<br><br>Rango de precios: 31 Bs. - 60 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.964040814872025, -67.10047047743406],
    name: "Dori pollo Oruro",
    category: "restaurantes",
    description:
      "Dori pollo Oruro <br><br> Sirve: Comida rápida, Cenas, Pollo frito.<br><br>Rango de precios: 12 Bs. - 28 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.96494390601734, -67.11024889908734],
    name: "Super hamburguesas Oruro",
    category: "restaurantes",
    description:
      "Super hamburguesas Oruro <br><br> Sirve: Comida rápida, Cenas, Hamburguesas, Pollo frito, Tortas.<br><br>Rango de precios: 20 Bs. - 78 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.962150621053368, -67.10382486932191],
    name: "Restaurant El Fogón",
    category: "restaurantes",
    description:
      "Restaurant El Fogón <br><br> Sirve: Almuerzo, Cenas, Comida Tradicional, Platillos tipicos.<br><br>Rango de precios: 25 Bs. - 60 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },
  {
    coords: [-17.96362586649361, -67.11157757054858],
    name: "Rancheria Oruro",
    category: "restaurantes",
    description:
      "Rancheria Oruro <br><br> Sirve: Comida rápida tradicional, Opciones variadas.<br><br>Rango de precios: 5 Bs. - 15 Bs.",
    image: "/static/img/conoceoruro/resta.png",
  },

  // Museos
  {
    coords: [-17.981218340991997, -67.12250936960811],
    name: "Museo Nacional Antropológico Eduardo López Rivas",
    category: "museos",
    description:
      "Sumérjase en la fascinante historia y cultura de Bolivia en el Museo Nacional Antropológico Eduardo López Rivas. Con una impresionante colección de artefactos antiguos y exhibiciones interactivas, este museo ofrece una visión única de la rica herencia cultural del país. Desde las civilizaciones precolombinas hasta la época colonial, cada sala de exposición cuenta una historia cautivadora que seguramente dejará una impresión duradera en sus visitantes.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.967538060592556, -67.1123490626169],
    name: "Museo Simón I. Patiño",
    category: "museos",
    description:
      "Descubra el legado de una de las familias más influyentes de Bolivia en el Museo Simón I. Patiño. Ubicado en una mansión histórica, este museo ofrece una mirada íntima a la vida y los logros de Simón I. Patiño, un destacado empresario y filántropo del siglo XX. Con exhibiciones meticulosamente curadas y artefactos originales, los visitantes pueden explorar la fascinante historia de esta figura icónica y su impacto en el país.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.967171985345495, -67.11886950750217],
    name: "Museo Sacro del Santuario del Socavón",
    category: "museos",
    description:
      "Sumérjase en la espiritualidad y el arte sacro en el Museo Sacro del Santuario del Socavón. Situado en el corazón de Oruro, este museo alberga una impresionante colección de arte religioso y objetos litúrgicos relacionados con la devoción al Virgen del Socavón. Desde pinturas vívidas hasta esculturas intrincadas, cada pieza cuenta una historia de fe y devoción que resuena profundamente con los visitantes.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.990566057353647, -67.13706274727136],
    name: "Museo Mineralógico",
    category: "museos",
    description:
      "Explore el fascinante mundo de los minerales y las gemas en el Museo Mineralógico. Con una amplia colección de especímenes únicos y raros, este museo ofrece una visión única de la geología y la mineralogía de Bolivia. Desde cristales brillantes hasta piedras preciosas exquisitamente talladas, cada exhibición revela la belleza y la diversidad de la tierra.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.971544164910565, -67.1017033147293],
    name: "Casa Arte Taller Cardozo Velasquez Oruro",
    category: "museos",
    description:
      "Sumérjase en el vibrante mundo del arte boliviano en la Casa Arte Taller Cardozo Velasquez Oruro. Con obras de artistas locales y regionales, este espacio cultural ofrece una experiencia única de inmersión en la escena artística de la región. Desde pinturas contemporáneas hasta esculturas innovadoras, cada obra de arte refleja la rica diversidad cultural y la creatividad de Bolivia.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.964236861414186, -67.112514718436],
    name: "Museo Diocesano San Miguel Oruro",
    category: "museos",
    description:
      "Descubra la historia y la herencia religiosa de Oruro en el Museo Diocesano San Miguel. Situado en el corazón del centro histórico, este museo alberga una impresionante colección de arte sacro y objetos litúrgicos que datan de la época colonial hasta la actualidad. Desde pinturas renacentistas hasta ornamentos litúrgicos elaboradamente decorados, cada pieza cuenta una historia única de fe y devoción.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.974403851760847, -67.12051834727194],
    name: "Estación Superior Teleférico Turístico",
    category: "museos",
    description:
      "Disfrute de una vista panorámica incomparable de Oruro desde la Estación Superior Teleférico Turístico. Suba a bordo de las góndolas y disfrute de un emocionante paseo aéreo sobre la ciudad, mientras admira las impresionantes vistas de los paisajes circundantes. Con cómodas instalaciones y acceso conveniente a las principales atracciones turísticas, esta estación es el punto de partida perfecto para explorar todo lo que Oruro tiene para ofrecer.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.98096464920422, -67.12270221843559],
    name: "Museo Arqueológico",
    category: "museos",
    description:
      "Sumérjase en el pasado ancestral de Bolivia en el Museo Arqueológico. Con una impresionante colección de artefactos precolombinos y restos arqueológicos, este museo ofrece una visión fascinante de las civilizaciones antiguas que una vez poblaron la región. Desde cerámicas antiguas hasta herramientas de piedra, cada exhibición revela los misterios y maravillas de la historia antigua de Bolivia.",
    image: "/static/img/conoceoruro/mm.png",
  },
  {
    coords: [-17.97671444617219, -67.13986746261656],
    name: "Esculturas Plaza Chiripujio",
    category: "museos",
    description:
      "Descubra la belleza y el arte en la Plaza Chiripujio, donde una colección única de esculturas adorna el paisaje urbano. Desde obras abstractas hasta representaciones figurativas, cada escultura es una expresión única de la creatividad humana y una celebración del arte público. Sumérjase en este oasis de belleza y tranquilidad, y déjese inspirar por la creatividad de los artistas locales.",
    image: "/static/img/conoceoruro/mm.png",
  },

  // Iglesias
  {
    coords: [-17.967410541719083, -67.11884670872529],
    name: "Iglesia del Virgen del Socavón",
    category: "iglesias",
    description:
      "Sumérjase en la belleza y la espiritualidad de la Iglesia del Virgen del Socavón. Con una arquitectura impresionante y una rica historia de devoción, esta iglesia es un lugar sagrado para los fieles y un punto de referencia icónico en la ciudad de Oruro. Desde sus majestuosos altares hasta sus impresionantes vitrales, cada detalle de esta iglesia cuenta una historia de fe y devoción que ha perdurado a lo largo de los siglos.",
    image: "/static/img/conoceoruro/i.png",
  },
  {
    coords: [-17.967189477386366, -67.11443379145307],
    name: "Parroquia Santo Domingo",
    category: "iglesias",
    description:
      " Descubra la serenidad y la tranquilidad en la Parroquia Santo Domingo. Con una arquitectura encantadora y un ambiente acogedor, esta iglesia es un refugio espiritual en el corazón de la ciudad. Desde sus hermosas vidrieras hasta su altar decorado, cada rincón de esta parroquia invita a la reflexión y la contemplación.",
    image: "/static/img/conoceoruro/i.png",
  },
  {
    coords: [-17.960318940871762, -67.11004610309142],
    name: "Iglesia de San Gerardo",
    category: "iglesias",
    description:
      "Explore la historia y la herencia religiosa de Oruro en la Iglesia de San Gerardo. Con una arquitectura impresionante y una rica tradición de devoción, esta iglesia es un símbolo de la fe católica en la región. Desde sus imponentes torres hasta su interior bellamente decorado, cada detalle de esta iglesia inspira asombro y reverencia en aquellos que la visitan.",
    image: "/static/img/conoceoruro/i.png",
  },
  {
    coords: [-17.970448252650204, -67.1030149184552],
    name: "Parroquia Jesús Obrero",
    category: "iglesias",
    description:
      "Sumérjase en la espiritualidad y el arte sacro en la Parroquia Jesús Obrero. Con una arquitectura moderna y una rica tradición de devoción, esta iglesia es un lugar de encuentro para los fieles y un centro de vida comunitaria en la ciudad. Desde sus impresionantes esculturas hasta sus hermosos murales, cada obra de arte en esta parroquia cuenta una historia de fe y redención que resuena profundamente con los visitantes.",
    image: "/static/img/conoceoruro/i.png",
  },
  {
    coords: [-17.969286308419335, -67.1134836992319],
    name: "Catedral Nuestra Señora de la Asunción",
    category: "iglesias",
    description:
      " Explore la grandeza y la majestuosidad de la Catedral Nuestra Señora de la Asunción. Con una arquitectura impresionante y una rica historia de devoción, esta catedral es un símbolo de la fe católica en Bolivia. Desde sus imponentes columnas hasta sus intrincados detalles decorativos, cada aspecto de esta catedral inspira asombro y admiración en aquellos que la visitan.",
    image: "/static/img/conoceoruro/i.png",
  },
];

// Agregar marcadores al mapa
locations.forEach((location) => {
  let markerIcon = L.icon({
    iconUrl: location.image,
    iconSize: [42, 42],
    popupAnchor: [0, -32],
  });

  let marker = L.marker(location.coords, { icon: markerIcon }).addTo(map2);
  marker.bindPopup(`
    <div class="text-center">
      <h4 >${location.name}</h4>
      <img src="${location.image}" alt="${location.name}" style="width: 150px;">
      <p style="color: black; line-height: 1.2; ">${location.description}</p>
    </div>
  `);
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

// Función para agregar opciones a un select
function addOptionsToSelect(selectId, locations, category) {
  let select = document.getElementById(selectId);
  locations
    .filter((loc) => loc.category === category)
    .forEach((location) => {
      let option = document.createElement("option");
      option.value = location.coords.join(",");
      option.text = location.name;
      select.add(option);
    });
}

// Agregar opciones a cada select
addOptionsToSelect("select-hoteles", locations, "hoteles");
addOptionsToSelect("select-restaurantes", locations, "restaurantes");
addOptionsToSelect("select-museos", locations, "museos");
addOptionsToSelect("select-iglesias", locations, "iglesias");

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

// Agregar mapa base
var carto_light = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  { attribution: "©OpenStreetMap, ©CartoDB", subdomains: "abcd", maxZoom: 24 }
);

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft",
}).addTo(map2);

// Función para buscar un lugar y mover el mapa a su ubicación
function searchLocation(event) {
  event.preventDefault(); // Evitar que el formulario recargue la página

  let input = document.getElementById("search-input").value.toLowerCase();
  let found = false;

  locations.forEach((location) => {
    if (location.name.toLowerCase().includes(input)) {
      let latLng = location.coords;
      map2.flyTo(latLng, 18);

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
}

// Asignar el evento submit al formulario de búsqueda
document
  .getElementById("search-form")
  .addEventListener("submit", searchLocation);

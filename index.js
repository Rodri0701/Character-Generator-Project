/* This is an example JavaScript file, feel free to remove/edit it anytime */
console.log(
  "%cProject by BigDevSoon",
  'font-size: 40px; font-weight: bold; color: #8A2BE2; font-family: "Comic Sans MS", cursive, sans-serif;'
);
console.log("Check out more projects at https://bigdevsoon.me");


/* Renderiza el doom ya que cargaba primero el script luego el html */
document.addEventListener("DOMContentLoaded", () => {
  const eleccion = {
  background: 0,
  ears: 0,
  hair: 0,
  eyes: 0,
  nose: 0,
  mouth: 0,
  accessories: 0
};
  const contenedor = document.getElementById("contenedor-imagenes");
  const botones = document.querySelectorAll("button[data-categoria]");
  const mensajedinamico = document.getElementById("mensaje");
  const cajaPersonaje = document.querySelector(".basis-2\\/5"); // caja gris

  botones.forEach((btn) => {
    btn.addEventListener("click", function () {
      const categoria = btn.dataset.categoria;
      mensajedinamico.textContent= `Loading images of ${categoria}`;
      console.log(categoria);
      
      contenedor.innerHTML = "";
      let erroresSeguidos = 0;
      const maxIntentos = 6;

      for (let i = 1; i <= maxIntentos; i++) {
        const img = new Image();
        img.src = `./assets/character-images-left-side/${categoria}/${i}.png`;
        img.alt = `${categoria} ${i}`;
        img.className = "rounded-2xl shadow-2xl w-40 h-40 object-cover mb-4 cursor-pointer bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 ";

        img.onload = () => {
          erroresSeguidos = 0; // reset si carga
          contenedor.appendChild(img);
          mensajedinamico.textContent= `Showing images of ${categoria}`;
          // Animación al hacer click
          img.addEventListener("click", () => {
            const imgRect = img.getBoundingClientRect();
            const boxRect = cajaPersonaje.getBoundingClientRect();
            eleccion[categoria] = i; // el índice de la imagen clickeada
            const clone = img.cloneNode();
            clone.style.position = "fixed";
            clone.style.left = imgRect.left + "px";
            clone.style.top = imgRect.top + "px";
            clone.style.width = imgRect.width + "px";
            clone.style.height = imgRect.height + "px";
            clone.style.transition = "all 0.6s ease-in-out";
            clone.style.zIndex = 9999;
            document.body.appendChild(clone);

            clone.getBoundingClientRect(); // forzar render

              // Mover clon a la caja gris
  clone.style.left = boxRect.left + (boxRect.width - imgRect.width) / 2 + "px";
  clone.style.top = boxRect.top + (boxRect.height - imgRect.height) / 2 + "px";
  clone.style.transform = "scale(0.5)";
  clone.style.opacity = "0.5";

clone.addEventListener("transitionend", () => {
  // Actualizar la capa correspondiente según la categoría
  const layer = document.getElementById(`layer-${categoria}`);
  if (layer) {
    layer.src = img.src;
  }
  clone.remove();
            });
          });
        };

        img.onerror = () => {
          erroresSeguidos++;
          if (erroresSeguidos >= 3) {
            // Si 3 seguidas fallan, se asume que ya no hay más
            console.log(`Fin de imágenes para ${categoria}`);
            return;
          }
        };
      }
    });
  });

  /* Evento del background  */
let selectedBackgroundColor = "#D9D9D9"; // color inicial por defecto

const colorPicker = document.getElementById("colorPicker");
// la caja gris

colorPicker.addEventListener("input", (e) => {
  selectedBackgroundColor = e.target.value;
  cajaPersonaje.style.backgroundColor = selectedBackgroundColor;
});


  /* Evento de descargar */
document.getElementById("downloadBtn").addEventListener("click", function () {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Ajusta el tamaño de la imagen final
  canvas.width = 600;  
  canvas.height = 800; 

  // Fondo degradado
  ctx.fillStyle = selectedBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const layers = [
    "./assets/character-images-left-side/default/basic-character.png",
    document.getElementById("layer-eyes").src,
    document.getElementById("layer-hair").src,
    document.getElementById("layer-ears").src,
    document.getElementById("layer-nose").src,
    document.getElementById("layer-mouth").src,
    document.getElementById("layer-accessories").src
  ].filter(src => src);

  let loaded = 0;

  layers.forEach((src) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      loaded++;
      if (loaded === layers.length) {
        const link = document.createElement("a");
        link.download = "character.png";
        link.href = canvas.toDataURL();
        link.click();
      }
    };
  });
});




// Evento de EMPTY
colorPicker.addEventListener("input", (e) => {
  selectedBackgroundColor = e.target.value;
  const caja = document.querySelector(".basis-2\\/5 > div");
  if (caja) caja.style.backgroundColor = selectedBackgroundColor;
});
// Evento de EMPTY
document.getElementById('emptyBtn').addEventListener('click', () => {
  const contenedorPersonaje = document.querySelector('.basis-2\\/5');
  if (contenedorPersonaje) {
    contenedorPersonaje.innerHTML = `
      <div class="basis-2/5 relative w-60 h-80 rounded-2xl overflow-hidden" 
           style="background-color: ${selectedBackgroundColor};">
        <img src="./assets/character-images-left-side/default/basic-character.png" 
             class="absolute top-0 left-0 w-full h-full object-cover" />
        <!-- capas de personalización -->
        <img id="layer-eyes" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-hair" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-ears" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-nose" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-mouth" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-accessories" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
      </div>
    `;
  
  }
});




/* eVENTO DE Random */

// helpers: comprobar existencia de imagen y listar índices válidos
function existsImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

async function listAvailableIndices(cat, max = 6) {
  const arr = [];
  for (let i = 1; i <= max; i++) {
    const src = `./assets/character-images-left-side/${cat}/${i}.png`;
    // espera la comprobación
    // (si tienes muchas imágenes o performance importa, reduce max)
    if (await existsImage(src)) arr.push(i);
  }
  return arr;
}

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}


document.getElementById('randomBtn').addEventListener('click', async () => {
  const categorias = ['eyes', 'hair', 'ears', 'nose', 'mouth', 'accessories'];
  const maxIntentos = 6; // ajustar si tienes más por categoría
  const contenedorPersonaje = document.querySelector('.basis-2\\/5');
  if (!contenedorPersonaje) return;

  // Asegurarnos de que la caja tenga la estructura de capas (igual que en empty)
  // Si no existe el layer-eyes, reconstruimos la estructura
  if (!document.getElementById('layer-eyes')) {
    contenedorPersonaje.innerHTML = `
      <div class="basis-2/5 relative w-60 h-80 rounded-2xl overflow-hidden" 
           style="background-color: ${selectedBackgroundColor ?? '#D9D9D9'};">
        <img src="./assets/character-images-left-side/default/basic-character.png" class="absolute top-0 left-0 w-full h-full object-cover" />
        <img id="layer-eyes" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-hair" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-ears" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-nose" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-mouth" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        <img id="layer-accessories" class="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
      </div>
    `;
  }

  // Generar color de fondo aleatorio y aplicarlo
  const nuevoColor = randomHexColor();
  selectedBackgroundColor = nuevoColor;          // variable global que usas para descarga
  const cajaInterior = contenedorPersonaje.querySelector('.relative') || contenedorPersonaje.querySelector('.basis-2\\/5') || contenedorPersonaje.firstElementChild;
  if (cajaInterior) cajaInterior.style.backgroundColor = nuevoColor;
  // si tienes un input color visible, sincronízalo:
  const colorPicker = document.getElementById('colorPicker');
  if (colorPicker) colorPicker.value = nuevoColor;

  // Para cada categoría buscamos índices válidos y elegimos uno al azar (si existen)
  for (const cat of categorias) {
    const validos = await listAvailableIndices(cat, maxIntentos);
    if (validos.length > 0) {
      const choice = validos[Math.floor(Math.random() * validos.length)];
      eleccion[cat] = choice; // actualizar el objeto global
      const layerEl = document.getElementById(`layer-${cat}`);
      if (layerEl) layerEl.src = `./assets/character-images-left-side/${cat}/${choice}.png`;
    } else {
      // ninguna imagen disponible -> limpiamos capa y elección
      eleccion[cat] = 0;
      const layerEl = document.getElementById(`layer-${cat}`);
      if (layerEl) layerEl.src = '';
    }
  }

  // Mensaje al usuario
  if (mensajedinamico) mensajedinamico.textContent = 'Random character generated!';
});



});




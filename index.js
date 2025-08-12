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
      mensajedinamico.textContent= `Cargando imagenes de la categoria ${categoria}`;
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



/* eVENTO DE EMPTY*/
document.getElementById('emptyBtn').addEventListener('click', () => {
  const contenedorPersonaje = document.querySelector('.basis-2\\/5');
  if (contenedorPersonaje) {
    // Aquí remueves o reseteas las imágenes agregadas
    contenedorPersonaje.innerHTML = `
      <h2 class="text-2xl font-bold text-gray-800 text-center">Character</h2>
      <div class="flex flex-col items-center justify-center h-full">
        <img src="./assets/character-images-left-side/default/basic-character.png" class="w-60 h-full object-cover" />
      </div>
    `;
  }
});

/* eVENTO DE Random */
document.getElementById('randomBtn').addEventListener('click', () => {
  const categorias = ['eyes', 'background', 'hair', 'ears', 'nose', 'mouth', 'accessories'];
  const contenedorPersonaje = document.querySelector('.basis-2\\/5');
  if (!contenedorPersonaje) return;

  // Limpiar personaje actual
  contenedorPersonaje.innerHTML = `<h2 class="text-2xl font-bold text-gray-800 text-center">Character</h2>`;

  categorias.forEach(cat => {
    // Número random, aquí asumo máximo 6 imágenes por categoría, cambia según tu caso
    const randomIndex = Math.floor(Math.random() * 6) + 1;

    const img = document.createElement('img');
    img.src = `./assets/character-images-left-side/${cat}/${randomIndex}.png`;
    img.alt = `${cat} ${randomIndex}`;
    img.className = 'rounded-xl shadow-lg w-40 h-40 object-cover mb-4 cursor-pointer';

    contenedorPersonaje.appendChild(img);
  });
});

});




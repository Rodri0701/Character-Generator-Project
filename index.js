/* This is an example JavaScript file, feel free to remove/edit it anytime */
console.log(
  "%cProject by BigDevSoon",
  'font-size: 40px; font-weight: bold; color: #8A2BE2; font-family: "Comic Sans MS", cursive, sans-serif;'
);
console.log("Check out more projects at https://bigdevsoon.me");


/* Renderiza el doom ya que cargaba primero el script luego el html */



document.addEventListener("DOMContentLoaded", () => {
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
        img.className = "rounded-xl shadow-lg w-40 h-40 object-cover mb-4 cursor-pointer";

        img.onload = () => {
          erroresSeguidos = 0; // reset si carga
          contenedor.appendChild(img);
          mensajedinamico.textContent= `Showing images of ${categoria}`;
          // Animación al hacer click
          img.addEventListener("click", () => {
            const imgRect = img.getBoundingClientRect();
            const boxRect = cajaPersonaje.getBoundingClientRect();

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
});




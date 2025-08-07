/* This is an example JavaScript file, feel free to remove/edit it anytime */
console.log(
  "%cProject by BigDevSoon",
  'font-size: 40px; font-weight: bold; color: #8A2BE2; font-family: "Comic Sans MS", cursive, sans-serif;'
);
console.log("Check out more projects at https://bigdevsoon.me");



document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-imagenes");
const botones = document.querySelectorAll("button[data-categoria]");

botones.forEach((btn) => {
  btn.addEventListener("click", function()  {
    const categoria = btn.dataset.categoria;
console.log (categoria)



    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    // Cargamos 10 imágenes por categoría
   for (let i = 1; i <= 50; i++) {
  const img = new Image(); // crea elemento imagen
  img.src = `./assets/character-images-left-side/${categoria}/${i}.png`;
  img.alt = `${categoria} ${i}`;
  img.className = "rounded-xl shadow-lg w-40 h-40 object-cover mb-4";

  img.onload = () => {
    // Solo agrega la imagen si carga bien
    contenedor.appendChild(img);
  };

  img.onerror = () => {
    // imagen no existe
  
  };
}
  });
});
});



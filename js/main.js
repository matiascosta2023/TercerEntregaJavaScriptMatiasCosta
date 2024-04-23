let products = [];
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
let carrito = [];
cargarProductos();
function cargarProductos() {
  const productsJSON = localStorage.getItem("BMS__products__BMS");
  if (!!productsJSON) {
    products = JSON.parse(productsJSON);
  } else {
    products = [
      {
        _id: getRandomString(8),
        name: "Vestido Rojo",
        price: 1500,
      },
      {
        _id: getRandomString(8),
        name: "Sueter blanco",
        price: 1500,
      },
      {
        _id: getRandomString(8),
        name: "Blusa de colores",
        price: 1600,
      },
      {
        _id: getRandomString(8),
        name: "Falda negra",
        price: 1800,
      },
    ];
    localStorage.setItem("BMS__products__BMS", JSON.stringify(products));
  }
  const articulosDiv = document.getElementById(`articulos`);
  articulosDiv.innerHTML = "";
  products.forEach((product) => {
    articulosDiv.innerHTML += `<div class="articulo">
       <h3>${product.name}</h3>
       <p>Precio: $${product.price}</p>
       <button class="agregar-carrito" onclick="addArticle('${product._id}')">Agregar al carrito</button>
       <button class="eliminar-item" onclick="deleteArticle('${product._id}')">Eliminar</button>
     </div>
   `;
  });

  cargarCarrito();
}

function getRandomString(length) {
  let options =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newString = "";
  for (let i = 0; i <= length; i++) {
    newString += options.charAt(Math.floor(Math.random() * options.length + 1));
  }
  return newString;
}

function addArticle(id) {
  let product = products.find((p) => p._id === id);
  if (!!product) {
    carrito.push(product);
    actualizarCarrito();
  }
}

function deleteArticle(id) {
  carrito = carrito.filter((c) => c._id !== id);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((articulo) => {
    const nuevoItemCarrito = document.createElement("li");
    nuevoItemCarrito.innerHTML = `${articulo.name} - Precio: $${articulo.price}`;
    listaCarrito.appendChild(nuevoItemCarrito);
  });

  const total = carrito.reduce(
    (acumulador, articulo) => acumulador + articulo.price,
    0
  );
  totalCarrito.textContent = `Total: $${total}`;
  localStorage.setItem("BMS__carrito__BMS", JSON.stringify(carrito));
}

function cargarCarrito() {
  const carritoJSON = localStorage.getItem("BMS__carrito__BMS");

  if (!!carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
  actualizarCarrito();
}

let comprarBTN = document.getElementById("comprarBTN");

comprarBTN.addEventListener("click", () => {
  let carritoDIV = document.getElementById("carrito");
  carritoDIV.innerHTML +=
    "<p>Gracias por comprar en Mats Costa tienda online.</p>";
});
const socket = io();

const productsList = document.getElementById("productsList");
const productsForm = document.getElementById("productsForm");
const errorMessage = document.getElementById("errorMessage");
const pid = document.getElementById("pid");
const btnDeleteProduct = document.getElementById("btnDeleteProduct");
socket.on("productsList", (data) => {
  const products = data.products || [];
  productsList.innerText = "";
  products.forEach((product) => {
    productsList.innerHTML += `<li>Id: ${product.id}, 
    Nombre: ${product.title}, 
    Descripción: ${product.description}, 
    Code: ${product.code}, 
    Precio: ${product.price}, 
    Estado: ${product.status}, 
    Categoría: ${product.category}</li>`;
  });
});

productsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formdata = new FormData(form);
  errorMessage.innerText = "";
  form.reset();
  socket.emit("createProduct", {
    title: formdata.get("title"),
    description: formdata.get("description"),
    code: formdata.get("code"),
    price: formdata.get("price"),
    category: formdata.get("category"),
    status: formdata.get("status") || "off",
    stock: formdata.get("stock"),
  });
});

btnDeleteProduct.addEventListener("click", () => {
  const id = Number(pid.value);
  pid.value = "";
  errorMessage.innerText = "";
  if (id > 0) {
    socket.emit("deleteProduct", { id });
  }
});

socket.on("errorMessage", (data) => {
  errorMessage.innerText = data.message;
});

const productsList = document.getElementById("productsList");
const btnRefreshProductsList = document.getElementById(
  "btnRefreshProductsList"
);
const loadProducts = async () => {
  const response = await fetch("/api/products", { method: "GET" });
  const data = await response.json();
  const products = data.playload || [];
  productsList.innerText = "";
  products.forEach((product) => {
    productsList.innerHTML += `<li>Id: ${product.id}, 
    Nombre: ${product.title}, 
    Descripción: ${product.description}, 
    Precio: ${product.price}, 
    Categoría: ${product.category}</li>`;
  });
};
btnRefreshProductsList.addEventListener("click", () => {
  loadProducts();
});
loadProducts();

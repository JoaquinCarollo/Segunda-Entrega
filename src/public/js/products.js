const linkCarrito = document.getElementById("linkCarrito");
const sendProduct = async () => {
  const productsResponse = await fetch("/api/products", { method: "GET" });
  const dataProducts = await productsResponse.json();
  const products = dataProducts.playload.docs;
  const cartResponse = await fetch("/api/cart", { method: "GET" });
  const dataCart = await cartResponse.json();
  const cart = dataCart.playload.docs;
  for (let i = 0; i < products.length; i++) {
    const productButton = document.getElementById(products[i]._id);
    productButton.addEventListener("click", async () => {
      await fetch(`/api/cart/${cart[0]._id}/products/${products[i]._id}`, {
        method: "POST",
      });
      alert("El producto se agrego al carrito");
    });
  }
  linkCarrito.href = `http://localhost:8080/cart/${cart[0]._id}`;
};
sendProduct();

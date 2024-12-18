const addButton = document.getElementsByTagName("button");
const linkCarrito = document.getElementById("linkCarrito");
const sendProduct = async () => {
  const cartResponse = await fetch("/api/cart", { method: "GET" });
  const dataCart = await cartResponse.json();
  const cart = dataCart.playload.docs;
  addButton[0].addEventListener("click", async () => {
    await fetch(`/api/cart/${cart[0]._id}/products/${addButton[0].id}`, {
      method: "POST",
    });
    alert("El producto se agrego al carrito");
  });
  linkCarrito.href = `http://localhost:8080/cart/${cart[0]._id}`;
};
sendProduct();

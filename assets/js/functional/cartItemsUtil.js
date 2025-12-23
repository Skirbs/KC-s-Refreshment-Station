const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

function saveItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function countTotalQty() {
  let totalQty = 0;
  for (const data of Object.values(cartItems)) {
    totalQty += data.qty;
  }
  return totalQty;
}

function countTotalPrice() {
  let totalPrice = 0;
  for (const data of Object.values(cartItems)) {
    totalPrice += data.price * data.qty;
  }
  return totalPrice;
}

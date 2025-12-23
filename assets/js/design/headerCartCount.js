let headerCartTotalQty = 0;

const cartCountElement = document.querySelector("#cart-count");

for (const [key, value] of Object.entries(cartItems)) {
  headerCartTotalQty += cartItems[key].qty;
  console.log(headerCartTotalQty);
}

cartCountElement.innerText = headerCartTotalQty > 0 ? headerCartTotalQty : "";

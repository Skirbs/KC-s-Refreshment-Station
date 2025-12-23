const emptyCartDiv = document.querySelector("#empty-cart-div");
const mainCartDiv = document.querySelector("#main-cart-div");

const cartItemsContainer = mainCartDiv.querySelector("#cart-items-container");

function createCartItem(name, price, qty, imgSrc) {
  const itemElement = document.createElement("li");
  itemElement.classList.add("cart-item");

  itemElement.innerHTML = `<span class="name-col">
              <img src="${imgSrc}" alt="${name}" />
              <hr />
              <span class="item-name">${name}</span>
            </span>
            <span class="quantity-col">
              <button class="qty-decrease"><img src="./assets/images/icons/minus.svg" alt="-" /></button>
              <span>x${qty}</span>
              <button class="qty-increase"><img src="./assets/images/icons/plus.svg" alt="+" /></button>
            </span>
            <span class="price-col">
              <span>₱${qty * price}</span>
            </span>`;

  return itemElement;
}

// Count Cart Items
if (Object.keys(cartItems).length > 0) {
  emptyCartDiv.style.display = "none";
  mainCartDiv.style.display = "block";

  for (const [key, value] of Object.entries(cartItems)) {
    cartItemsContainer.append(createCartItem(key, value.price, value.qty, value.imgSrc));
  }
}

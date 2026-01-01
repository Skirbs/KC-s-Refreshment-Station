const emptyCartDiv = document.querySelector("#empty-cart-div");
const mainCartDiv = document.querySelector("#main-cart-div");

const cartItemsContainer = mainCartDiv.querySelector("#cart-items-container");

const cartTotalAmountSpan = mainCartDiv.querySelector("#total-amount");

function createCartItem(name, cartItemValues) {
  const itemElement = document.createElement("li");

  itemElement.classList.add("cart-item");

  itemElement.innerHTML = `<span class="name-col">
              <img src="${cartItemValues.imgSrc}" alt="${name}" />
              <hr />
              <span class="item-name">${name}</span>
            </span>
            <span class="quantity-col">
              <button class="qty-decrease"><img src="./assets/images/icons/minus.svg" alt="-" /></button>
              <span>x${cartItemValues.qty}</span>
              <button class="qty-increase"><img src="./assets/images/icons/plus.svg" alt="+" /></button>
            </span>
            <span class="price-col">
              <span>₱${cartItemValues.qty * cartItemValues.price}</span>
            </span>`;

  const qtyIncreaseBtn = itemElement.querySelector(".qty-increase");
  const qtyDecreaseBtn = itemElement.querySelector(".qty-decrease");
  const qtyTextSpan = itemElement.querySelector(".quantity-col span");
  const qtyPriceSpan = itemElement.querySelector(".price-col span");

  qtyIncreaseBtn.addEventListener("mousedown", (ev) => {
    cartItemValues.qty++;
    qtyTextSpan.innerText = `x${cartItemValues.qty}`;

    headerCartTotalQty++;
    cartCountElement.innerText = headerCartTotalQty;

    qtyPriceSpan.innerText = `₱${cartItemValues.qty * cartItemValues.price}`;

    cartTotalAmountSpan.innerText = `₱${countTotalPrice()} (${countTotalQty()} ${
      countTotalQty() > 1 ? "items" : "item"
    })`;

    saveItems();
  });

  qtyDecreaseBtn.addEventListener("mousedown", (ev) => {
    cartItemValues.qty--;
    qtyTextSpan.innerText = `x${cartItemValues.qty}`;

    headerCartTotalQty--;
    cartCountElement.innerText = headerCartTotalQty > 0 ? headerCartTotalQty : "";

    qtyPriceSpan.innerText = `₱${cartItemValues.qty * cartItemValues.price}`;

    cartTotalAmountSpan.innerText = `₱${countTotalPrice()} (${countTotalQty()} ${
      countTotalQty() > 1 ? "items" : "item"
    })`;

    if (cartItemValues.qty === 0) {
      delete cartItems[name];
      itemElement.remove();
    }

    if (Object.keys(cartItems).length === 0) {
      emptyCartDiv.style.display = "block";
      mainCartDiv.style.display = "none";
    }

    saveItems();
  });

  qtyIncreaseBtn;
  return itemElement;
}

// Count Cart Items
if (Object.keys(cartItems).length > 0) {
  emptyCartDiv.style.display = "none";
  mainCartDiv.style.display = "block";

  for (const [key, value] of Object.entries(cartItems)) {
    cartItemsContainer.append(createCartItem(key, value));
  }
}

cartTotalAmountSpan.innerText = `₱${countTotalPrice()} (${countTotalQty()} ${countTotalQty() > 1 ? "items" : "item"})`;

// Checkout Functionality
const checkoutButton = document.querySelector("#checkout-button");
const checkoutModal = document.querySelector("dialog");
const closeModalButton = document.querySelector("#close-modal-button");

// Checkout Button
checkoutButton.addEventListener("mousedown", (ev) => {
  // Show Modal
  checkoutModal.showModal();

  // Clear Cart
  localStorage.removeItem("cartItems");

  // Clear cart items container
  cartItemsContainer.innerHTML = "";

  // Reset Header Cart Count
  headerCartTotalQty = 0;
  cartCountElement.innerText = "";
});

// Close Modal Button
closeModalButton.addEventListener("mousedown", (ev) => {
  // Close Modal
  checkoutModal.close();

  // Reset Cart UIj
  emptyCartDiv.style.display = "block";
  mainCartDiv.style.display = "none";
});

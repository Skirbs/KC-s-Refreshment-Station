const addToCartBtns = document.querySelectorAll(".add-to-cart");

addToCartBtns.forEach((btn) => {
  const btnParent = btn.parentElement;
  const imgSrc = btnParent.parentElement.querySelector("img").src;

  let productTitle;
  let productPrice;

  btn.addEventListener("mousedown", (ev) => {
    productTitle = btnParent.querySelector("h4").innerText;
    productPrice = parseInt(btnParent.querySelector(".price").innerText.slice(1));
    const productSelect = btnParent.querySelector("select");

    if (productSelect) {
      // If the product has a size collection (eg. Medium, Large)
      // Then use the selected size and price instead
      const valueElem = productSelect.options[productSelect.selectedIndex];
      productTitle = `${productTitle} (${productSelect.value})`;
      productPrice = parseInt(valueElem.dataset.price);
    }

    if (cartItems[productTitle]) {
      // If product already in cart
      cartItems[productTitle].qty++;
    } else {
      // If product not yet in cart
      cartItems[productTitle] = {};

      cartItems[productTitle].price = productPrice;
      cartItems[productTitle].qty = 1;
      cartItems[productTitle].imgSrc = imgSrc;
    }

    saveItems();

    headerCartTotalQty++;
    cartCountElement.innerText = headerCartTotalQty;

    console.log(cartItems);
  });
});

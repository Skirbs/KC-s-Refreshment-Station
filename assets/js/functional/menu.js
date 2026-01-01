const addToCartBtns = document.querySelectorAll(".add-to-cart");
const toastContainer = document.querySelector("#toast-container");

// Add to Cart Button Functionality
addToCartBtns.forEach((btn) => {
  const btnParent = btn.parentElement;
  const imgSrc = btnParent.parentElement.querySelector("img").src;

  let productTitle;
  let productPrice;

  // On Click of Add to Cart Button
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

    // Show toast notification
    const toastMessageSpan = document.createElement("span");
    toastMessageSpan.classList.add("toast-message");
    toastMessageSpan.innerText = `🛒 Bought "${productTitle}"`;
    toastContainer.append(toastMessageSpan);

    setTimeout(() => {
      toastMessageSpan.classList.add("closed");
      setTimeout(() => {
        toastMessageSpan.remove();
      }, 500);
    }, 2000);
  });
});

// Search Button Functionality
const menuSearchBtn = document.querySelector("#menu-search");
const menuSearchBar = document.querySelector("#search-bar");
const menuItems = document.querySelectorAll(".menu-item");

let isSearching = false;

menuSearchBtn.addEventListener("mousedown", (ev) => {
  isSearching = !isSearching;
  menuSearchBar.style.display = isSearching ? "inline" : "none";

  toggleUI();

  // Revert back menu items if not searching
  if (!isSearching) {
    menuItems.forEach((menuItem) => {
      menuItem.style.display = "flex";
    });
  } else {
    console.log("lllal");
    setTimeout(() => {
      menuSearchBar.focus();
    }, 0);
  }
});

menuSearchBar.addEventListener("input", (ev) => {
  updateMenuSearchResults(ev.target.value.toLowerCase().trim());
});

document.addEventListener("keydown", (ev) => {
  if (ev.key == "Escape") {
    isSearching = false;
    menuSearchBar.style.display = "none";

    toggleUI();

    menuItems.forEach((menuItem) => {
      menuItem.style.display = "flex";
    });
  }
});

function toggleUI() {
  // Toggle Header and <hr> based on if searching
  const h2List = document.querySelectorAll("h2");
  const h3List = document.querySelectorAll("h3");
  const hrList = document.querySelectorAll("hr");

  h2List.forEach((headerElement) => {
    if (isSearching) {
      headerElement.style.display = headerElement.id == "search-result-header" ? "block" : "none";
    } else {
      headerElement.style.display = headerElement.id == "search-result-header" ? "none" : "block";
    }
  });

  h3List.forEach((headerElement) => {
    headerElement.style.display = isSearching ? "none" : "block";
  });

  hrList.forEach((hrElement) => {
    hrElement.style.display = isSearching ? "none" : "block";
  });
}

function updateMenuSearchResults(searchInput) {
  menuItems.forEach((menuItem) => {
    const menuItemTitle = menuItem.querySelector("h4").innerText.toLowerCase();
    const menuItemDesc = menuItem.querySelector(".desc").innerText.toLowerCase();

    if (menuItemTitle.includes(searchInput) || menuItemDesc.includes(searchInput)) {
      menuItem.style.display = "flex";
    } else {
      menuItem.style.display = "none";
    }
  });
}

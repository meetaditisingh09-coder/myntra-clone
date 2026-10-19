const filterButtons = document.querySelectorAll(".filter");
const categoryCards = document.querySelectorAll(".category-card");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("searchInput");
const resultText = document.getElementById("resultText");
const noProducts = document.getElementById("noProducts");

let bagCount = 0;
let wishlistCount = 0;

function filterProducts(category) {
  let visibleProducts = 0;

  productCards.forEach((card) => {
    const isVisible =
      category === "all" || card.dataset.category === category;

    card.classList.toggle("hidden", !isVisible);

    if (isVisible) {
      visibleProducts++;
    }
  });

  noProducts.style.display = visibleProducts === 0 ? "block" : "none";

  resultText.textContent =
    category === "all"
      ? ""
      : `${visibleProducts} product(s) found in ${category}`;
}

/* Filter buttons */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));

    button.classList.add("active");
    filterProducts(button.dataset.filter);
  });
});

/* Category cards */
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    filterButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.filter === category
      );
    });

    filterProducts(category);

    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Search products */
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleProducts = 0;

  productCards.forEach((card) => {
    const productName = card.dataset.name;
    const isVisible = productName.includes(searchText);

    card.classList.toggle("hidden", !isVisible);

    if (isVisible) {
      visibleProducts++;
    }
  });

  noProducts.style.display = visibleProducts === 0 ? "block" : "none";

  resultText.textContent = searchText
    ? `${visibleProducts} search result(s) found`
    : "";
});

/* Add products to bag */
document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    bagCount++;

    document.getElementById("bagCount").textContent = bagCount;

    showToast("Product added to bag!");
  });
});

/* Wishlist */
document.querySelectorAll(".heart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isLiked = button.classList.toggle("liked");

    if (isLiked) {
      button.textContent = "♥";
      wishlistCount++;
      showToast("Added to wishlist!");
    } else {
      button.textContent = "♡";
      wishlistCount--;
      showToast("Removed from wishlist!");
    }

    document.getElementById("wishlistCount").textContent = wishlistCount;
  });
});

/* Header buttons */
document.getElementById("profileButton").addEventListener("click", () => {
  showToast("Profile page is not included in this frontend demo.");
});

document.getElementById("bagButton").addEventListener("click", () => {
  showToast(`You have ${bagCount} item(s) in your bag.`);
});

document.getElementById("wishlistButton").addEventListener("click", () => {
  showToast(`You have ${wishlistCount} item(s) in your wishlist.`);
});

/* Mobile menu */
document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("navigation").classList.toggle("show");
});

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navigation").classList.remove("show");
  });
});

/* Toast message */
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* Current year */
document.getElementById("year").textContent = new Date().getFullYear();
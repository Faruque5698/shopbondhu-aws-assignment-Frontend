// Sample Product Catalog for ShopBondhu
const products = [
  {
    id: 1,
    name: "Wireless ANC Headphones",
    category: "electronics",
    price: 3499,
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    badge: "Hot",
    icon: "🎧"
  },
  {
    id: 2,
    name: "Smart Fitness Watch Ultra",
    category: "gadgets",
    price: 2199,
    rating: "⭐⭐⭐⭐☆ (4.5)",
    badge: "-20%",
    icon: "⌚"
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    category: "electronics",
    price: 2850,
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    badge: "Bestseller",
    icon: "⌨️"
  },
  {
    id: 4,
    name: "Premium Cotton Casual Shirt",
    category: "fashion",
    price: 1250,
    rating: "⭐⭐⭐⭐☆ (4.3)",
    badge: "Trending",
    icon: "👕"
  },
  {
    id: 5,
    name: "Fast Charging Power Bank 20000mAh",
    category: "gadgets",
    price: 1850,
    rating: "⭐⭐⭐⭐⭐ (4.7)",
    badge: "Must Have",
    icon: "🔋"
  },
  {
    id: 6,
    name: "Ergonomic Office Mouse",
    category: "electronics",
    price: 890,
    rating: "⭐⭐⭐⭐☆ (4.2)",
    badge: "Sale",
    icon: "🖱️"
  },
  {
    id: 7,
    name: "Polarized UV Sunglasses",
    category: "fashion",
    price: 750,
    rating: "⭐⭐⭐⭐⭐ (4.6)",
    badge: "Popular",
    icon: "🕶️"
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    category: "gadgets",
    price: 1650,
    rating: "⭐⭐⭐⭐☆ (4.4)",
    badge: "New",
    icon: "🔊"
  }
];

let cartItemCount = 0;

function renderProducts(items) {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 40px;">No products found in this category.</p>`;
    return;
  }

  container.innerHTML = items
    .map(
      (product) => `
      <div class="product-card" data-category="${product.category}">
        <div class="product-thumb">
          <span class="product-badge">${product.badge}</span>
          ${product.icon}
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h4 class="product-title">${product.name}</h4>
          <div class="product-rating">${product.rating}</div>
          <div class="product-price-row">
            <span class="price">৳${product.price.toLocaleString()}</span>
            <button class="add-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function addToCart(productName) {
  cartItemCount++;
  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.textContent = cartItemCount;
  }

  // Quick feedback alert
  const originalTitle = document.title;
  document.title = `(1) Added: ${productName} - ShopBondhu`;
  setTimeout(() => {
    document.title = originalTitle;
  }, 2000);
}

// Category filter handlers
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      if (filter === "all") {
        renderProducts(products);
      } else {
        const filtered = products.filter((p) => p.category === filter);
        renderProducts(filtered);
      }
    });
  });

  // Search filter
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  function executeSearch() {
    const query = (searchInput.value || "").trim().toLowerCase();
    if (!query) {
      renderProducts(products);
      return;
    }
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  }

  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", executeSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeSearch();
      }
    });
  }
});


// Lấy các phần tử cần thiết
const cartIcon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cart-close");
const addCartButtons = document.querySelectorAll(".add-cart");
const cartContent = document.querySelector(".cart-content");
const totalPriceEl = document.querySelector(".total-price");
const btnBuy = document.querySelector(".btn-buy");
const cartItemCount = document.querySelector(".cart-item-count");

// Mảng lưu sản phẩm trong giỏ
let cartItems = [];

// Mở giỏ hàng
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

// Đóng giỏ hàng
cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Thêm sản phẩm
addCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productBox = e.target.closest(".product-box");
    const title = productBox.querySelector(".product-title").innerText;
    let priceText = productBox.querySelector(".price").innerText;
    // Loại bỏ ký tự $ và dấu . để chuyển thành số
    let price = parseFloat(priceText.replace(/[^0-9]/g, ""));
    const imgSrc = productBox.querySelector("img").src;

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let existing = cartItems.find((item) => item.title === title);
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems.push({ title, price, imgSrc, quantity: 1 });
    }

    updateCart();
    cart.classList.add("active"); // Mở giỏ khi thêm
  });
});

// Cập nhật giỏ hàng
function updateCart() {
  cartContent.innerHTML = "";
  let total = 0;
  let count = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
            <img src="${item.imgSrc}" class="cart-img">
            <div class="cart-detail">
                <h3 class="cart-product-title">${item.title}</h3>
                <span class="cart-price">$${item.price.toLocaleString()}</span>
                <div class="cart-quantity">
                    <button class="decrement">-</button>
                    <span class="number">${item.quantity}</span>
                    <button class="increment">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;

    // Nút xóa sản phẩm
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
      cartItems.splice(index, 1);
      updateCart();
    });

    // Nút tăng giảm số lượng
    cartBox.querySelector(".decrement").addEventListener("click", () => {
      if (item.quantity > 1) item.quantity--;
      updateCart();
    });
    cartBox.querySelector(".increment").addEventListener("click", () => {
      item.quantity++;
      updateCart();
    });

    cartContent.appendChild(cartBox);
  });

  totalPriceEl.innerText = `$${total.toLocaleString()}`;
  cartItemCount.innerText = count;
}

// Nút mua hàng
btnBuy.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  alert("Payment successful!");
  cartItems = [];
  updateCart();
  cart.classList.remove("active");
});

const addProductForm = document.getElementById("addProductForm");
const productContent = document.querySelector(".product-content");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const img = document.getElementById("productImg").value;

  // Tạo sản phẩm mới
  const productBox = document.createElement("div");
  productBox.classList.add("product-box");
  productBox.innerHTML = `
        <div class="img-box">
            <img src="${img}" alt="${name}">
        </div>
        <h2 class="product-title">${name}</h2>
        <div class="price-and-cart">
            <span class="price">$${price}</span>
            <i class="ri-shopping-cart-2-line add-cart"></i>
        </div>
    `;

  productContent.appendChild(productBox);

  // Reset form
  addProductForm.reset();

  // Thêm chức năng add-to-cart cho sản phẩm mới
  const newAddCart = productBox.querySelector(".add-cart");
  newAddCart.addEventListener("click", (event) => {
    const productBox = event.target.closest(".product-box");
    const title = productBox.querySelector(".product-title").innerText;
    let priceText = productBox.querySelector(".price").innerText;
    let price = parseFloat(priceText.replace(/[^0-9]/g, ""));
    const imgSrc = productBox.querySelector("img").src;

    let existing = cartItems.find((item) => item.title === title);
    if (existing) existing.quantity += 1;
    else cartItems.push({ title, price, imgSrc, quantity: 1 });

    updateCart();
    cart.classList.add("active");
  });
});

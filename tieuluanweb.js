let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.body.style.zoom = "90%";

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  showToast(`${name} đã được thêm vào giỏ hàng!`);
}

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  if (cartList) {
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)} 
        <button onclick="removeFromCart(${index})">Xóa</button>`;
      cartList.appendChild(li);
    });
    cartTotal.textContent = formatPrice(total);
  }
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  showToast('Đã xóa món khỏi giỏ hàng!');
}

function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-body').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}
document.getElementById('cart-toggle').onclick = function () {
  document.getElementById('cart-sidebar').classList.add('open');
};

document.getElementById('cart-close').onclick = function () {
  document.getElementById('cart-sidebar').classList.remove('open');
};

function checkout() {
  if (cart.length === 0) {
    showToast('Giỏ hàng đang trống!');
    return;
  }

  // Hiện thông báo đặt hàng
  alert('Đơn hàng sẽ sớm được giao đến bạn!');

  // Xóa giỏ hàng
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
}
function filterMenu() {
  const keyword = document.getElementById("menu-search").value.toLowerCase();
  const items = document.querySelectorAll(".items .item");

  items.forEach(item => {
    const name = item.querySelector("h3").textContent.toLowerCase();
    if (name.includes(keyword)) {
      item.style.display = "inline-block";
    } else {
      item.style.display = "none";
    }
  });
}



updateCart();
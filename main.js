// Initialize cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navigation
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = cartCount;
  });
}

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} added to cart!`);
}

// Display cart items (called on cart.html)
function displayCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  if (!cartItemsDiv || !cartTotalSpan) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    const div = document.createElement('div');
    div.className = 'flex justify-between items-center bg-white p-4 rounded-lg shadow';
    div.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold">${item.name}</h3>
        <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <div>
        <span class="text-lg font-semibold">$${itemTotal.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})" class="ml-4 text-red-600 hover:text-red-800">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotalSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Handle checkout form submission
function submitCheckout() {
  const name = document.getElementById('name')?.value;
  const address = document.getElementById('address')?.value;
  const card = document.getElementById('card')?.value;

  if (!name || !address || !card) {
    alert('Please fill out all fields.');
    return;
  }

  alert('Order placed successfully! Thank you for shopping with FreshMart.');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  window.location.href = 'index.html';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  if (window.location.pathname.includes('cart.html')) {
    displayCart();
  }
});
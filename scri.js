// Add product to localStorage (cart)
function addToCart(name, price, img, redirect = false) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart.find(i => i.name === name);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count in navbar (optional)
  updateCartCount();

  // If redirect = true, go to cart page
  if (redirect) {
    window.location.href = 'cart.html';
  } else {
    alert(`${name} added to cart!`);
  }
}

// Display cart contents on cart.html
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <tr>
        <td><img src="${item.img}" width="80"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>$${itemTotal}</td>
        <td><button onclick="removeItem(${index})"><i class="fas fa-trash"></i></button></td>
      </tr>
    `;
  });

  totalPriceEl.textContent = total.toFixed(2);
  updateCartCount();
}

// Update item quantity
function updateQuantity(index, newQty) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity = parseInt(newQty);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Remove item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// Clear cart
function clearCart() {
  localStorage.removeItem('cart');
  displayCart();
}

// Update cart item count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const bagIcon = document.querySelector('.fa-bag-shopping');
  if (bagIcon) {
    bagIcon.setAttribute('data-count', count);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  displayCart();
  updateCartCount();
});

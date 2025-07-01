// order-confirmation.js
import { getProducts, createCartItemHtml } from './products.js'; // Import the shared module

// Function to display confirmed cart items
function displayConfirmedCart(cartItems, allProducts) { // Pass allProducts to createCartItemHtml
    const confirmedCartListElement = document.getElementById('confirmed-cart-list');
    confirmedCartListElement.innerHTML = ''; // Clear loading message

    if (!cartItems || cartItems.length === 0) {
        confirmedCartListElement.innerHTML = '<li>No items found in your order.</li>';
        return;
    }

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = createCartItemHtml(item, allProducts); // Use the shared function
        confirmedCartListElement.appendChild(listItem);
    });
}

// Main function to run when the DOM is loaded (script is deferred, so no listener needed)
// Fetch all products first to ensure we have full details like imageUrl
const allProducts = getProducts(); // Use getProducts from products.js

const urlParams = new URLSearchParams(window.location.search);

const firstName = urlParams.get('firstName');
const lastName = urlParams.get('lastName');
const cardNumber = urlParams.get('cardNumber');
const cartJson = urlParams.get('cart');

let confirmedCart = { items: [], total: 0 };
if (cartJson) {
    try {
        const parsedCartItems = JSON.parse(cartJson);
        // Re-calculate total from parsed items for accuracy
        const calculatedTotal = parsedCartItems.reduce((sum, item) => sum + item.totalItemPrice, 0);
        confirmedCart = { items: parsedCartItems, total: calculatedTotal };
    } catch (e) {
        console.error("Error parsing cart data from URL:", e);
        document.getElementById('confirmed-cart-list').innerHTML = '<li style="color: red;">Error loading cart details.</li>';
    }
}

// Display customer name
const customerNameElement = document.getElementById('customer-name');
if (firstName && lastName) {
    customerNameElement.textContent = `${firstName} ${lastName}`;
} else {
    customerNameElement.textContent = 'Valued Customer';
}

// Display confirmed cart items
displayConfirmedCart(confirmedCart.items, allProducts);

// Display total charged
document.getElementById('total-charged').textContent = confirmedCart.total.toFixed(2);

// Display last 4 digits of card number
const lastFourDigitsElement = document.getElementById('last-four-digits');
if (cardNumber && cardNumber.length >= 4) {
    // Remove non-digits and take last 4
    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    lastFourDigitsElement.textContent = cleanCardNumber.slice(-4);
} else {
    lastFourDigitsElement.textContent = 'N/A';
}
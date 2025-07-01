// checkout.js
import { getProducts, createCartItemHtml } from './products.js'; // Import the shared module

// Function to create a cart object
function createCart(products) {
    // Define the desired items and quantities in our cart
    // Using IDs from dental.json: toothbrush has id=101, floss has id=103.
    const cartItems = [
        { id: 101, quantity: 2 }, // 2 Electric Toothbrush
        { id: 103, quantity: 1 }  // 1 Dental Floss (Mint)
    ];

    const cart = [];
    let cartTotal = 0;

    cartItems.forEach(cartItem => {
        // Find product by id from the fetched products
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            const itemPrice = product.price * cartItem.quantity;
            cartTotal += itemPrice;
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl, // Include imageUrl for display
                quantity: cartItem.quantity,
                totalItemPrice: itemPrice
            });
        }
    });
    return { items: cart, total: cartTotal };
}

// Function to display cart items
function displayCart(cart, allProducts) { // Pass allProducts to createCartItemHtml
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');

    // Clear loading message
    cartListElement.innerHTML = '';

    if (cart.items.length === 0) {
        cartListElement.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = createCartItemHtml(item, allProducts); // Use the shared function
            cartListElement.appendChild(listItem);
        });
    }

    cartTotalElement.textContent = cart.total.toFixed(2);
}

let globalCart = { items: [], total: 0 };

// Load and display cart
const products = await getProducts(); // Use getProducts from products.js
if (products.length > 0) {
    globalCart = createCart(products);
    displayCart(globalCart, products); // Pass products for image lookup
}

// --- Form Validation Functions ---
// Put all your form validation logic here
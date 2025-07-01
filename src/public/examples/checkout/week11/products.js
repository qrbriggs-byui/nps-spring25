// products.js
// This module handles loading product data and generating common cart item HTML.

/**
 * Fetches product data from dental.json.
 * @returns {Array} An array of product objects.
 */
export async function getProducts() {
    try {
        const response = await fetch('dental.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Could not fetch product data:", error);
        // It's up to the calling function (checkout.js/order-confirmation.js) to display specific errors
        return [];
    }
}

/**
 * Generates the HTML string for a single product list item in the cart.
 * @param {Object} item - The cart item object (should have name, price, quantity, totalItemPrice, imageUrl).
 * @param {Array} allProducts - All products data, used to lookup imageUrl if 'item' doesn't have it directly.
 * @returns {string} The HTML string for the list item.
 */
export function createCartItemHtml(item, allProducts = []) {
    // Determine the image URL. Prioritize item.imageUrl, then lookup from allProducts.
    const imageUrl = item.imageUrl || (allProducts.find(p => p.id === item.id)?.imageUrl) || 'https://placehold.co/70x70?text=No+Image';

    return `
        <img src="${imageUrl}" alt="${item.name}" class="cart-item-thumbnail">
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price-qty">$${item.price.toFixed(2)} x ${item.quantity}</div>
        </div>
        <div class="cart-item-quantity">$${item.totalItemPrice.toFixed(2)}</div>
    `;
}
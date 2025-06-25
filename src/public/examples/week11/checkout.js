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


// --- Form Validation Functions ---

// Helper to display error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Helper to clear error messages
function clearError(elementId) {
    const errorElement = document.getElementById(elementId + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Validation for First/Last Name (requires capital first letter)
function validateName(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'This field is required.');
        return false;
    }
    if (!/^[A-Z]/.test(value)) {
        showError(inputElement.id, 'Must start with a capital letter.');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Validation for Street Address (max 30 characters)
function validateStreetAddress(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'Street address is required.');
        return false;
    }
    if (value.length > 30) {
        showError(inputElement.id, 'Must be no more than 30 characters.');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Validation for City (no numbers)
function validateCity(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'City is required.');
        return false;
    }
    if (/\d/.test(value)) {
        showError(inputElement.id, 'City name cannot contain numbers.');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Validation for State (2 capital letters)
function validateState(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'State is required.');
        return false;
    }
    if (!/^[A-Z]{2}$/.test(value)) {
        showError(inputElement.id, 'State must be 2 capital letters (e.g., NY).');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Validation for Zip (exactly 5 numbers)
function validateZip(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'Zip code is required.');
        return false;
    }
    if (!/^\d{5}$/.test(value)) {
        showError(inputElement.id, 'Zip code must be exactly 5 numbers.');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Luhn's Algorithm Validation for Credit Card Number
function isValidLuhn(cardNumber) {
    const cleanCardNumber = cardNumber.replace(/\D/g, '');

    if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        return false;
    }

    let sum = 0;
    let doubleUp = false;
    for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanCardNumber.charAt(i), 10);
        if (doubleUp) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        doubleUp = !doubleUp;
    }
    return (sum % 10) === 0;
}

function validateCardNumber(inputElement) {
    const value = inputElement.value.trim();
    if (value === '') {
        showError(inputElement.id, 'Credit card number is required.');
        return false;
    }
    const cleanValue = value.replace(/\D/g, '');
    if (!isValidLuhn(cleanValue)) {
        showError(inputElement.id, 'Invalid credit card number.');
        return false;
    }
    clearError(inputElement.id);
    return true;
}

// Validation for Expiration Month/Year
function validateExpirationDate(monthElement, yearElement) {
    const month = parseInt(monthElement.value, 10);
    const year = parseInt(yearElement.value, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        showError('expDate', 'Invalid month or year.');
        return false;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed

    if (year < currentYear) {
        showError('expDate', 'Expiration year cannot be in the past.');
        return false;
    }
    if (year === currentYear && month < currentMonth) {
        showError('expDate', 'Expiration month cannot be in the past for the current year.');
        return false;
    }

    clearError('expDate');
    return true;
}


// --- Main Execution Logic ---
let globalCart = { items: [], total: 0 };

document.addEventListener('DOMContentLoaded', async () => {
    // Load and display cart
    const products = await getProducts(); // Use getProducts from products.js
    if (products.length > 0) {
        globalCart = createCart(products);
        displayCart(globalCart, products); // Pass products for image lookup
    }

    const checkoutForm = document.getElementById('checkout-form');
    const hiddenCartData = document.getElementById('hidden-cart-data');

    // Get references to form input elements
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const streetAddressInput = document.getElementById('streetAddress');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipInput = document.getElementById('zip');
    const cardNumberInput = document.getElementById('cardNumber');
    const expMonthInput = document.getElementById('expMonth');
    const expYearInput = document.getElementById('expYear');

    // Add real-time validation listeners
    firstNameInput.addEventListener('input', () => validateName(firstNameInput));
    lastNameInput.addEventListener('input', () => validateName(lastNameInput));
    streetAddressInput.addEventListener('input', () => validateStreetAddress(streetAddressInput));
    cityInput.addEventListener('input', () => validateCity(cityInput));
    stateInput.addEventListener('input', () => validateState(stateInput));
    zipInput.addEventListener('input', () => validateZip(zipInput));
    cardNumberInput.addEventListener('input', () => validateCardNumber(cardNumberInput));
    expMonthInput.addEventListener('input', () => validateExpirationDate(expMonthInput, expYearInput));
    expYearInput.addEventListener('input', () => validateExpirationDate(expMonthInput, expYearInput));


    // Handle form submission
    checkoutForm.addEventListener('submit', (event) => {
        let formIsValid = true;

        // Perform all validations
        // Chaining with && ensures all validations run and 'formIsValid' remains false if any fail
        formIsValid = validateName(firstNameInput) && formIsValid;
        formIsValid = validateName(lastNameInput) && formIsValid;
        formIsValid = validateStreetAddress(streetAddressInput) && formIsValid;
        formIsValid = validateCity(cityInput) && formIsValid;
        formIsValid = validateState(stateInput) && formIsValid;
        formIsValid = validateZip(zipInput) && formIsValid;
        formIsValid = validateCardNumber(cardNumberInput) && formIsValid;
        formIsValid = validateExpirationDate(expMonthInput, expYearInput) && formIsValid;

        if (!formIsValid) {
            event.preventDefault(); // Stop form submission if validation fails
            console.log("Form validation failed. Please check inputs.");
        } else {
            // If validation passes, set the hidden cart data
            hiddenCartData.value = JSON.stringify(globalCart.items);
            console.log("Form submitted successfully! Cart data:", hiddenCartData.value);
            // Form will proceed to order-confirmation.html with GET method
        }
    });
});
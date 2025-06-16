import { getDentalProducts } from "./load-products.js"

async function showProduct(id){
    let products = await getDentalProducts()
    let product = products.find(p => p.id === id);    
    if (!product){
        console.error("Product " + id + " was not found.")
        return;
    }

    document.querySelector("section").innerHTML = 
    `
        <h2>${product.name}</h2>
        <p><img src="${product.imageUrl}" alt="${product.name}"></p>
        <p>${product.description}</p>
        <p><span class="price">$${product.price}</span></p>
    `
}

// Get references to the overlay elements
const overlayContainer = document.querySelector('.overlay-container');
const signUpButton = document.querySelector('.signup-button'); // Use the class for the button

// Function to dismiss the overlay
function dismissOverlay() {
    overlayContainer.classList.add("hide-overlay");
    overlayContainer.setAttribute("aria-hidden", "true");
}

// 1. Dismiss by clicking the "Sign Up Now!" button as long as the e-mail is populated
signUpButton.addEventListener('click', () => {
    const signUpEmail = document.querySelector('#sign-up-email').value;
    if (signUpEmail){
        dismissOverlay();
    }
});

// 2. Dismiss by pressing the ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        dismissOverlay();
    }
});

// 3. Dismiss by clicking outside the overlay contents
overlayContainer.addEventListener('click', (event) => {
    // Check if the click occurred directly on the overlay container,
    // and not on its children (the overlay contents)
    if (event.target === overlayContainer) {
        dismissOverlay();
    }
});

const paramsString = window.location.search
const params = new URLSearchParams(paramsString);
const id = params.get('id');
showProduct(parseInt(id))
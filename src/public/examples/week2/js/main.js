// Importing from my-module.mjs
import { greet, PI } from './my-module.mjs';

// Use greet from my-module
document.getElementById("greeting").innerText = greet('Browser User');

// Use PI from my-module
console.log(`The value of PI is: ${PI}`);

// Create a click listener that computes the area
document.getElementById("compute-area").addEventListener("click", () => {
    let radius = parseInt(document.getElementById("radius").value)
    let area = (PI * radius * radius).toFixed(2)
    document.getElementById("radius-message").innerText = `The radius of a circle with radius ${radius} is ${area}`
})
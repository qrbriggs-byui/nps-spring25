const checkoutForm = document.getElementById('checkoutForm');
const errorMessagesDiv = document.getElementById('errorMessages');
const errorList = errorMessagesDiv.querySelector('ul');

/**
 * Validates a credit card number using Luhn's algorithm.
 * @param {string} cardNumber - The credit card number string to validate.
 * @returns {boolean} - True if the card number is valid according to Luhn's algorithm, false otherwise.
 */
function isValidLuhn(cardNumber) {
    let sum = 0;
    let isSecondDigit = false;

    // Remove any non-digit characters from the card number
    cardNumber = cardNumber.replace(/\D/g, '');

    // Check typical card number length (13-19 digits)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        return false;
    }

    // Iterate through the digits from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        // Double every second digit from the right
        if (isSecondDigit) {
            digit *= 2;
            // If doubling results in a number greater than 9, subtract 9
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        // Toggle the flag for the next digit
        isSecondDigit = !isSecondDigit;
    }
    // The number is valid if the sum is a multiple of 10
    return (sum % 10 === 0);
}

// Event listener for form submission
checkoutForm.addEventListener('submit', function (event) {
    // Clear any previous error messages
    errorList.innerHTML = '';
    errorMessagesDiv.classList.add('hidden'); // Hide the error div initially
    let errors = []; // Array to collect all validation errors

    // Get specific field values for custom JavaScript validation
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expMonth = parseInt(document.getElementById('expMonth').value, 10);
    const expYear = parseInt(document.getElementById('expYear').value, 10);

    // --- Custom JavaScript Validation for Payment Information ---

    // Credit Card Number: Is invalid or does not pass Luhn's algorithm
    if (!cardNumber || !isValidLuhn(cardNumber)) {
        errors.push("Credit Card Number: Is invalid or does not pass Luhn's algorithm.");
    }

    // Expiration Date: Month and Year validation
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // getMonth() is 0-indexed

    if (expYear < currentYear) {
        errors.push('Expiration Date: Year must be current or future.');
    } else if (expYear === currentYear && expMonth < currentMonth) {
        errors.push('Expiration Date: Month/Year must be current or future.');
    }

    // --- Display Errors or Submit Form ---
    if (errors.length > 0) {
        // If errors exist, populate the error list and make the error div visible
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });

        errorMessagesDiv.classList.remove('hidden'); // Show the error div        
        event.preventDefault();
    }
});

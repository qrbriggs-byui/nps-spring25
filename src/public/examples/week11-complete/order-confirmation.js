// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('firstName') || 'Valued Customer'; // Default if name not found
const lastName = urlParams.get('lastName') || '';

// Construct the thank you message
const thankYouText = `Thank you, ${firstName} ${lastName}!`;

// Display the message on the page
const thankYouMessageElement = document.getElementById('thankYouMessage');
if (thankYouMessageElement) {
    thankYouMessageElement.textContent = thankYouText;
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Event listener for the hamburger icon click
hamburger.addEventListener('click', () => {
    // Toggle the 'is-active' class to show/hide the menu
    navMenu.classList.toggle('is-active');
});

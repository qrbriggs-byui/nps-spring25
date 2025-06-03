const overlay = document.getElementById('fullScreenOverlay');

function openOverlay() {
    overlay.classList.add('is-visible');
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    overlay.classList.remove('is-visible');
    // Re-enable body scrolling
    document.body.style.overflow = '';
}

// Close overlay if escape key is pressed
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-visible')) {
        closeOverlay();
    }
});

document.querySelector(".close-overlay-button").addEventListener("click", closeOverlay)
document.querySelector(".open-overlay-button").addEventListener("click", openOverlay)
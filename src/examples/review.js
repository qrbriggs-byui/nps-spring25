// Handle form submission
document.getElementById('zooForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const animal = document.getElementById('animal').value;
    document.getElementById('confirmation').textContent = `Thanks, ${name}! We love ${animal}s too!`;
    });

// Add click event to highlight elements
document.getElementById('highlightButton').addEventListener('click', function() {
    const animals = document.querySelectorAll('.animal');
    animals.forEach(el => el.classList.toggle('highlight'));
    });
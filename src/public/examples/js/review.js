// Function to handle form submission
function handleForm(event){
    event.preventDefault();
    const name = document.getElementById('name').value;
    const animal = document.querySelector('#animal').value;
    document.getElementById('confirmation').innerText = `Thanks, ${name}! We love ${animal}s too!`;
}

// Handle form submission
document.getElementById('zooForm').addEventListener('submit', handleForm);

// Add click event to highlight elements
document.getElementById('highlightButton').addEventListener('click', () => {
    const animals = document.querySelectorAll('.animal');
    animals.forEach(el => el.classList.toggle('highlight'));
    });

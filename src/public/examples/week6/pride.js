// Function to display a list of quotes
function displayQuotes(quotes) {
    const listElement = document.getElementById("quoteList");
    listElement.innerHTML = "";  // Clear the list if needed
    quotes.forEach(quote => {
        const li = document.createElement("li");
        li.textContent = quote;
        listElement.appendChild(li);
    });
}

async function loadQuotes() {   
    const storedQuotes = localStorage.getItem("pride-prejudice");
    if (storedQuotes) {
        // Load from localStorage
        const quotes = JSON.parse(storedQuotes);
        displayQuotes(quotes);
        console.log("Loaded quotes from localStorage.");
    } else {
        // No localStorage data, fetch from API
        const I_NUMBER = "I12345";  // Replace with your actual I-NUMBER

        try {
            const response = await fetch("http://localhost:8080/quotes", {
                headers: {
                    "I-NUMBER": I_NUMBER
                }
            });

            if (!response.ok) {
                throw new Error("Unauthorized or error fetching data");
            }

            const data = await response.json();
            const prideBook = data.books.find(book => book.title === "Pride and Prejudice");
            if (!prideBook) {
                throw new Error("Book not found");
            }

            const quotes = prideBook.quotes;
            displayQuotes(quotes);

            // Store in localStorage
            localStorage.setItem("pride-prejudice", JSON.stringify(quotes));
            console.log("Fetched quotes from API and saved to localStorage.");
        } catch (error) {
            console.error("Error:", error);
        }
    }
}

// Call the function
loadQuotes();

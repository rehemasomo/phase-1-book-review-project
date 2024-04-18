document.addEventListener('DOMContentLoaded', function() {
    // Array to store books
    let books = [];

    // Function to display book details
    function displayBookDetails(bookTitle) {
        const selectedBook = books.find(book => book.title === bookTitle);

        if (selectedBook) {
            document.getElementById("book-title").textContent = `Title: ${selectedBook.title}`;
            document.getElementById("book-author").textContent = `Author: ${selectedBook.author}`;
            document.getElementById("book-genre").textContent = `Genre: ${selectedBook.genre}`;
            document.getElementById("book-review").textContent = `Review: ${selectedBook.review}`;
            document.getElementById("delete-button").style.display = "block";
            document.getElementById("delete-button").setAttribute("data-id", selectedBook.id);
        } else {
            console.error("Book not found with title:", bookTitle);
        }
    }

    // Function to add a new book
    function addBook(newBook) {
        books.push(newBook);
        updateAvailableBooksList();
        showSuccessMessage('Book added successfully.');
    }

    // Function to delete a book
    function deleteBook(bookId) {
        const index = books.findIndex(book => book.id === bookId);

        if (index !== -1) {
            books.splice(index, 1);
            updateAvailableBooksList();
            showSuccessMessage('Book deleted successfully.');
        } else {
            console.error('Book not found with id:', bookId);
            showErrorMessage('Failed to delete book. Please try again.');
        }
    }

    // Function to update the list of available books
    function updateAvailableBooksList() {
        const availableBooksList = document.getElementById('available-books');
        availableBooksList.innerHTML = '';

        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = book.title;

            // Add delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("data-id", book.id);
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                const bookId = parseInt(this.getAttribute('data-id'));
                deleteBook(bookId);
            });

            listItem.appendChild(deleteButton);

            listItem.addEventListener('click', function() {
                displayBookDetails(book.title);
            });
            availableBooksList.appendChild(listItem);
        });
    }

    // Function to display success message
    function showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = message;
        document.body.appendChild(successMessage);
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
        displaySuccessMessage('Success! Book added successfully.');
    }

    // Function to display error message
    function showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = message;
        document.body.appendChild(errorMessage);
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }

    // Event listener to add a new book
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;
        const review = document.getElementById('review').value;

        const newBook = {
            id: books.length + 1,
            title,
            author,
            genre,
            review
        };

        addBook(newBook);
        addBookForm.reset();
    });

    // Event listener for deleting a book
    document.getElementById("delete-button").addEventListener("click", function(event) {
        const bookId = parseInt(this.getAttribute('data-id'));
        deleteBook(bookId);
    });

    // Initial display of book details
    displayBookDetails("");

    //  data from db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            books = data.books;
            updateAvailableBooksList();
        })
        .catch(error => console.error('Error fetching data:', error));
});

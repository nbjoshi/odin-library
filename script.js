const myLibrary = [];

const modal = document.querySelector(".modal");
const addBookButton = document.querySelector(".open-modal-btn");
const form = document.querySelector(".form");
const cancelButton = document.querySelector(".cancel-btn");
const bookContainer = document.querySelector(".book-container");

let numberOfBooksRead = 0;

function Book(title, author, genre, rating) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.rating = rating;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function updateBookDisplay() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const titleElement = document.createElement("h2");
    titleElement.textContent = `"${book.title}"`;

    const authorElement = document.createElement("h2");
    authorElement.textContent = book.author;

    const genreElement = document.createElement("h2");
    genreElement.textContent = book.genre || "No genre provided";

    const ratingElement = document.createElement("h2");
    ratingElement.textContent = `${book.rating ? book.rating : "No"} / 5`;

    const readButton = document.createElement("button");
    readButton.classList.add("read-button");

    if (book.isRead) {
      readButton.textContent = "Read";
      readButton.style.backgroundColor = "lightgreen";
    } else {
      readButton.textContent = "Unread";
      readButton.style.backgroundColor = "crimson";
    }

    readButton.addEventListener("click", () => {
      if (readButton.textContent === "Read") {
        readButton.textContent = "Unread";
        readButton.style.backgroundColor = "crimson";
        numberOfBooksRead = Math.max(numberOfBooksRead - 1, 0);
        book.isRead = false;
      } else {
        readButton.textContent = "Read";
        readButton.style.backgroundColor = "lightgreen";
        numberOfBooksRead++;
        book.isRead = true;
      }
      updateBooksRead();
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      const index = myLibrary.indexOf(book);
      if (index > -1) {
        myLibrary.splice(index, 1);
        updateBookDisplay();
      }
    });

    bookElement.appendChild(titleElement);
    bookElement.appendChild(authorElement);
    bookElement.appendChild(genreElement);
    bookElement.appendChild(ratingElement);
    bookElement.appendChild(readButton);
    bookElement.appendChild(removeButton);

    bookContainer.appendChild(bookElement);
  });
}

cancelButton.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hidden");
});

addBookButton.addEventListener("click", () => {
  modal.classList.add("show");
  modal.classList.remove("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const author = document.querySelector("#author").value.trim();
  const genre = document.querySelector("#genre").value.trim();
  const rating = document.querySelector("#rating").value.trim();
  const isChecked = document.querySelector("#read").checked;
  if (isChecked) numberOfBooksRead++;

  const newBook = new Book(title, author, genre, rating);
  newBook.isRead = isChecked;

  addBookToLibrary(newBook);
  updateBookDisplay();
  updateBooksRead();

  form.reset();
  modal.classList.remove("show");
  modal.classList.add("hidden");
});

function updateBooksRead() {
  const booksReadElement = document.querySelector("#books-read-label");
  booksReadElement.textContent = `Books Read: ${numberOfBooksRead}`;
}

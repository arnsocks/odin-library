class Book {
  index = "";

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }

  set index(i) {
    this.index = i;
  }

  toggleReadStatus() {
    this.read = this.read === "Read" ? "Not Read" : "Read";
  }
}

class Library {
  books = [];

  add(book) {
    this.books.push(book);
  }

  remove(index) {
    this.books.splice(index, 1);
  }

  get books() {
    return this.books;
  }
}

const ScreenController = (() => {
  // ** Decare DOM objects into variables
  const cardContainer = document.querySelector(".card-container");
  const newBookBtn = document.querySelector(".add-button");
  const newBookDialog = document.querySelector("#new-book-dialog");
  const closeDialogBtn = document.querySelector("dialog button");
  const newBookForm = document.getElementById("new-book-form");

  // const confirmBtn = document.querySelector("#confirmBtn");
  const newBookTitle = document.querySelector("#title");
  const titleError = document.querySelector("#title + span.error");

  const newBookAuthor = document.querySelector("#author");
  const authorError = document.querySelector("#author + span.error");

  const newBookPages = document.querySelector("#pages");
  const readSelector = document.querySelector("#read-selector");
  let readStatus = "";

  let library = new Library();

  // ** EVENT LISTENER FUNCTIONS
  function confirmBtnClick() {
    let newBook = new Book(
      newBookTitle.value,
      newBookAuthor.value,
      newBookPages.value,
      readStatus
    );
    library.add(newBook);

    // Reset the values of the inputs so they're blank for the next book
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    readStatus = "";
    resetReadSelector();

    newBookDialog.close();

    updateScreen();
  }

  // ** EVENT LISTENERS **

  newBookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // We're never actually submitting this form
    if (!newBookTitle.validity.valid || !newBookAuthor.validity.valid) {
      showError();
    } else confirmBtnClick();
  });

  newBookTitle.addEventListener("input", () => {
    if (newBookTitle.validity.valid) {
      titleError.textContent = "";
      titleError.className = "error";
    } else {
      showError();
    }
  });

  newBookAuthor.addEventListener("input", () => {
    if (newBookAuthor.validity.valid) {
      authorError.textContent = "";
      authorError.className = "error";
    } else showError();
  });

  newBookBtn.addEventListener("click", () => {
    newBookDialog.showModal();
  });

  closeDialogBtn.addEventListener("click", () => {
    newBookDialog.close();
  });

  readSelector.addEventListener("click", (e) => {
    readStatus = e.target.value;
  });

  // ** METHODS **

  function drawBook(book) {
    // Create a new book "card" based on the data the object
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <p class='title'>${book.title}</p>
      <p class='author'>${book.author}</p>
      <p class='pages'>${book.pages} pages</p>
      <p class='status'>Status: <span class='read'>${book.read}</span></p>
      <button class='delete-button' type='button'>Delete</button>
    `;

    // Allow user to change the read status
    let read = card.querySelector(".read");
    read.addEventListener("click", () => {
      book.toggleReadStatus();
      updateScreen();
    });

    // Allow user to delete books
    let deleteBtn = card.querySelector(".delete-button");
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete ${book.title}?`)) {
        library.remove(book.index);
        updateScreen();
      }
    });
    cardContainer.appendChild(card);
  }

  function updateScreen() {
    books = library.books;

    // Clear the existing list of books
    cardContainer.textContent = "";

    // Put the new Book Button back
    cardContainer.appendChild(newBookBtn);

    // Draw each new book to the screen
    for (let i = 0; i < books.length; i++) {
      books[i].index = i;
      drawBook(books[i]);
    }
  }

  function resetReadSelector() {
    let radios = readSelector.querySelectorAll("input");
    for (let i = 0; i < radios.length; i++) {
      radios[i].checked = false;
    }
  }

  function showError() {
    if (newBookTitle.validity.valueMissing) {
      titleError.textContent = "You must supply a book title";
    }
    if (newBookAuthor.validity.valueMissing) {
      authorError.textContent = "You must supply an Author";
    }
    titleError.className = "error active";
    authorError.className = "error active";
  }

  // Populate some starter books for the library
  library.add(new Book("Leviathan's Wake", "James S. A. Corey", "561", "Read"));
  library.add(new Book("Seveneves", "Neal Stephenson", "867", "Read"));
  library.add(
    new Book("A Thousand Splendid Suns", "Khaled Hosseini", "370", "Not Read")
  );
  library.add(
    new Book(
      "The Slow Regard of Silent Things",
      "Patrick Rothfuss",
      "123",
      "Read"
    )
  );

  // Initial page load
  updateScreen();
})();

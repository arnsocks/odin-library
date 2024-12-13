let body = document.querySelector("body");
body.style.color = "white";

let cardContainer = document.querySelector(".card-container");
const addButton = document.querySelector(".add-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialogBtn = document.querySelector("dialog button");
const confirmBtn = document.querySelector("#confirmBtn");
const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author");
const newBookPages = document.querySelector("#pages");
const newBookRead = document.querySelector("#read");

closeDialogBtn.addEventListener("click", () => {
  newBookDialog.close();
})

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); //Do not actually submit the form
  alert(`The read value of this book is: ${newBookRead.value}`)
  
  addBookToLibrary(
    newBookTitle.value,
    newBookAuthor.value,
    newBookPages.value,
    newBookRead.value
  );

  newBookDialog.close();
});

addButton.addEventListener("click", createBook);

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  drawBook(book);
}

function createBook() {
  // TO DO
  // -Get user input for book parameters
  // -Add that book to the library
  // -Draw the library
  
  newBookDialog.showModal();
}

function drawBook(book) {
  // Create a new book "card" based on the data the object
  let card = document.createElement("div");
    card.className = "card";

    // *** OPTION FOR ITERATING ALL VALUE OF THE BOOK ***
    // for (let [key, value] of Object.entries(book)) {
    //   let item = document.createElement("p");
    //   item.className = key;
    //   item.textContent = value;
    //   card.appendChild(item);
    // }

    let title = document.createElement("p");
    title.className = "title";
    title.textContent = book.title;

    let author = document.createElement("p");
    author.className = "author";
    author.textContent = book.author;
    
    let pages = document.createElement("p");
    pages.className = "pages";
    pages.textContent = `${book.pages} pages`;

    let read = document.createElement("p");
    read.className = "read";
    read.textContent = book.read ? "Read" : "Not Read";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    cardContainer.appendChild(card);
}

// Generate some starter books for the library
addBookToLibrary("Leviathan's Wake", "James S. A. Corey", 561, true);
addBookToLibrary("Seveneves", "Neal Stephenson", 867, true);
addBookToLibrary("A Thousand Splendid Suns", "Khaled Hosseini", 370, false);
addBookToLibrary("The Slow Regard of Silent Things", "Patrick Rothfuss", 123, true);
let body = document.querySelector("body");
body.style.color = "white";

let cardContainer = document.querySelector(".card-container");
const addButton = document.querySelector(".add-button");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector("dialog button");

closeDialogBtn.addEventListener("click", () => {
  dialog.close();
})



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
}

// Generate some starter books for the library
addBookToLibrary("Leviathan's Wake", "James S. A. Corey", 561, true);
addBookToLibrary("Seveneves", "Neal Stephenson", 867, true);
addBookToLibrary("A Thousand Splendid Suns", "Khaled Hosseini", 370, false);
addBookToLibrary("The Slow Regard of Silent Things", "Patrick Rothfuss", 123, true);

function createBook() {
  // TO DO
  // -Get user input for book parameters
  // -Add that book to the library
  // -Draw the library
  
  dialog.showModal();
}

function drawLibrary() {
  for(const book of myLibrary) {
  
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
}

drawLibrary();
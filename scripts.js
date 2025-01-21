let cardContainer = document.querySelector(".card-container");
const newBookBtn = document.querySelector(".add-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialogBtn = document.querySelector("dialog button");
const confirmBtn = document.querySelector("#confirmBtn");
const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author");
const newBookPages = document.querySelector("#pages");
const readSelector = document.querySelector("#read-selector");
let readStatus = "";

const myLibrary = [];

newBookBtn.addEventListener("click", () => {
  newBookDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
  newBookDialog.close();
})

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Do not actually submit the form
  
  addBookToLibrary(
    newBookTitle.value,
    newBookAuthor.value,
    newBookPages.value,
    readStatus
  );

  // Reset the values of the inputs so they're blank for the next book
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
  readStatus = "";
  resetReadSelector();

  newBookDialog.close();
});

// Read the value of the radio without having to submit the form
readSelector.addEventListener("click", (e) => {
  readStatus = e.target.value;
})

function resetReadSelector() {
  let radios = readSelector.querySelectorAll("input");
  for (let i = 0; i< radios.length; i++) {
    radios[i].checked = false;
  }
};

class Book {

  constructor(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }

  get info() {
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  }

  toggleReadStatus() {
    this.read = this.read === "Read" ? "Not Read" : "Read";
  }
}
// function Book(title, author, pages, read, index) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.index = index;
//   this.info = function() {
//     return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
//   };
//   this.toggleReadStatus = function() {
//     this.read = this.read === "Read" ? "Not Read" : "Read";
//   }
// }

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read, myLibrary.length);
  myLibrary.push(book);
  drawBook(book);
}

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
    read.textContent = book.read;
  })

  // Allow user to delete books
  let deleteBtn = card.querySelector(".delete-button");
  deleteBtn.addEventListener("click",  ()=> {
     if (confirm (`Are you sure you want to delete ${book.title}?`)) {
      delete myLibrary[book.index];
      cardContainer.removeChild(card);
     }
  })

  cardContainer.appendChild(card);
}


// Populate some starter books for the library
addBookToLibrary("Leviathan's Wake", "James S. A. Corey", "561", "Read");
addBookToLibrary("Seveneves", "Neal Stephenson", "867", "Read");
addBookToLibrary("A Thousand Splendid Suns", "Khaled Hosseini", "370", "Not Read");
addBookToLibrary("The Slow Regard of Silent Things", "Patrick Rothfuss", "123", "Read");
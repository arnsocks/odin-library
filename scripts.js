let cardContainer = document.querySelector(".card-container");
const addButton = document.querySelector(".add-button");
const newBookDialog = document.querySelector("#new-book-dialog");
const closeDialogBtn = document.querySelector("dialog button");
const confirmBtn = document.querySelector("#confirmBtn");
const newBookTitle = document.querySelector("#title");
const newBookAuthor = document.querySelector("#author");
const newBookPages = document.querySelector("#pages");
const readSelector = document.querySelector("#read-selector");
let readStatus = "";
const myLibrary = [];

addButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

// Read the value of the radio without having to submit the form
readSelector.addEventListener("click", (e) => {
  readStatus = e.target.value;
})

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

  readStatus = "";
  newBookDialog.close();
});



function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
  };
  this.toggleReadStatus = function() {
    this.read = (this.read === "Read") ? "Not Read" : "Read";
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
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
    `;
    // let read = document.createElement("p");
    // read.className = "read";
    // read.textContent = `Status: ${book.read}`;
    
    

    //let readBtn = document.createElement("button");
    let read = card.querySelector(".read");
    //readBtn.textContent = "Update Status";
    //readBtn.setAttribute("type", "button");
    read.addEventListener("click", () => {
      book.toggleReadStatus();
      read.textContent = book.read;
    })
    // card.appendChild(read);
    // card.appendChild(readBtn);
    //card.appendChild(read);
    cardContainer.appendChild(card);
    // readBtn.addEventListener("click", () => {
    //   alert(`You are trying to change the status of ${book.title}!`);
    //   book.toggleReadStatus();
    //   read.textContent = book.read;
    // })
    
    // *** OPTION FOR ITERATING ALL VALUE OF THE BOOK ***
    // for (let [key, value] of Object.entries(book)) {
    //   let item = document.createElement("p");
    //   item.className = key;
    //   item.textContent = value;
    //   card.appendChild(item);
    // }
}

// Populate some starter books for the library
addBookToLibrary("Leviathan's Wake", "James S. A. Corey", 561, "Read");
addBookToLibrary("Seveneves", "Neal Stephenson", 867, "Read");
addBookToLibrary("A Thousand Splendid Suns", "Khaled Hosseini", 370, "Not Read");
addBookToLibrary("The Slow Regard of Silent Things", "Patrick Rothfuss", 123, "Read");
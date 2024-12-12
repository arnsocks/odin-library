body = document.querySelector("body");
body.style.color = "white";

cardContainer = document.querySelector(".card-container");

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

addBookToLibrary("Leviathan's Wake", "James S. A. Corey", 561, true);
addBookToLibrary("Seveneves", "Neal Stephenson", 867, true);
addBookToLibrary("A Thousand Splendid Suns", "Khaled Hosseini", 370, false);

console.table(myLibrary);

function drawLibrary() {
  // Loop through the Library array and create cards for each book
  // append each book to the cardContainer
  for(const book of myLibrary) {
    // create the book div
    let card = document.createElement("div");
    card.className = "card";

    let title = document.createElement("h3");
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
    read.textContent = book.read;

    // create the title, author, page & read elements
    // put the content of each book into the correct element
    // append the elements to the book
    // append the book tot he cardContainer

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    cardContainer.appendChild(card);
  }
}

drawLibrary();
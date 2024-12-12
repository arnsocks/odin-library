body = document.querySelector("body");
body.style.color = "white";

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
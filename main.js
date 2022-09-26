const books = [];
const RENDER_EVENT = "render-book";

function addBook() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsCompleted").checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(
    generatedID,
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompleteBookShelfList = document.getElementById(
    "uncompleteBookshelfList"
  );
  uncompleteBookShelfList.innerHTML = "";

  const completedBookShelfList = document.getElementById(
    "completedBookshelfList"
  );
  completedBookShelfList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);

    if (bookItem.isCompleted) {
      completedBookShelfList.append(bookElement);
      console.log(bookElement);
    } else {
      uncompleteBookShelfList.append(bookElement);
    }
  }
});

function makeBook(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = bookObject.year;

  const bookShelf = document.createElement("div");
  bookShelf.append(bookTitle, bookAuthor, bookYear);
  bookShelf.setAttribute("id", `${bookObject.id}`);

  if (bookObject.isCompleted) {
    const uncompleteButton = document.createElement("button");
    uncompleteButton.setAttribute("class", "green");
    uncompleteButton.append("Belum selesai dibaca");
    uncompleteButton.addEventListener("click", function () {
      addBookToUncomplete(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "red");
    deleteButton.append("Hapus");
    deleteButton.addEventListener("click", function () {
      deleteBook(bookObject.id);
    });

    bookShelf.append(uncompleteButton, deleteButton);
  } else {
    const completedButton = document.createElement("button");
    completedButton.setAttribute("class", "green");
    completedButton.append("Sudah selesai dibaca");
    completedButton.addEventListener("click", function () {
      addBookToCompleted(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "red");
    deleteButton.append("Hapus");
    deleteButton.addEventListener("click", function () {
      deleteBook(bookObject.id);
    });

    bookShelf.append(completedButton, deleteButton);
  }
  return bookShelf;
}

function addBookToCompleted(bookId) {
  const bookItem = findBook(bookId);

  if (bookItem == null) return;

  bookItem.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBookToUncomplete(bookId) {
  const bookItem = findBook(bookId);

  if (bookItem == null) return;

  bookItem.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function deleteBook(bookId) {
  const bookItem = findBookIndex(bookId);

  if (bookItem === -1) return;

  books.splice(bookItem, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookId) {
  for (const bookItem in books) {
    if (books[bookItem].id === bookId) {
      return bookItem;
    }
  }
  return -1;
}

/*
    git    = software nya (nyimpen tapi di local)
    github = layanan untuk menyimpan git nya tadi itu
*/

/* buat repository atw repository local :
    
    git init       (Initialized empty Git repository, tapi repository nya masih kosong)
    git add mainjs (INI KALO BUAT 1 FILE AJA main.js)
    git add .
*/

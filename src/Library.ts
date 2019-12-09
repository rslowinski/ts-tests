import {Book} from "./Book";

export class Library {

    books: Book[]

    constructor(books) {
        this.books = books;
    }

    addBook(book){
        this.books.push(book)
    }

    countBorrowedBooks() {
        return this.books
            .filter(book => !book.isAvailable())
            .length;
    }


    isAvailable(bookNumber) {
        let book = this.books.find(book => book.number === bookNumber);

        if (book !== undefined) {
            return book.isAvailable();
        } else {
            return null;
        }
    }

    whenWillBeAvailable(bookNumber) {
        let book = this.books.find(book => book.number === bookNumber);

        if (book !== undefined) {
            return book.whenWillBeAvailable();
        } else {
            return null;
        }
    }

    getTopBorrowing() {
        return this.books
            .sort((a, b) => {
                return a.borrowsList.length < b.borrowsList.length ? 1 : -1;
            })[0];
    }

    getBookByNumber(bookNumber){
        let book = this.books.find(book => book.number === bookNumber)

        if (book !== undefined) {
            return book;
        } else {
            return null;
        }
    }

    getAvailableBookOrNull(bookTitle) {
        let book = this.books.find(book => book.title === bookTitle);

        if (book !== undefined && book.isAvailable()) {
            return book;
        } else {
            return null;
        }
    }

    getFirstAvailableBookOrNull(){
        let book = this.books.find(book => book.isAvailable());

        if (book !== undefined) {
            return book;
        } else {
            return null;
        }
    }
}

export default Library
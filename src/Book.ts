import Borrowing from "./Borrowing";

export class Book {

    currentBorrowing: Borrowing;
    borrowsList: Borrowing[];
    number: string;
    title: string;
    author: string;

    constructor(number, title, author) {
        this.currentBorrowing = null;
        this.borrowsList = [];
        this.number = number;
        this.title = title;
        this.author = author;
    }

    returnBook(person) {
        if (this.isAvailable() || this.currentBorrowing.person !== person || person === null) {
            return false;
        }
        this.currentBorrowing = null;
        return true;
    }

    borrowBook(person, days) {
        if (!this.isAvailable() || days <= 0 || person === null) {
            return false;
        }

        const dateFrom = new Date(Date.now());
        const dateTo = new Date(dateFrom);

        dateTo.setDate(dateFrom.getDate() + days);

        this.currentBorrowing = new Borrowing(person, dateFrom, dateTo);
        this.borrowsList.push(this.currentBorrowing);

        return true;
    }

    prolong(person, duration) {
        if (this.isAvailable() || this.currentBorrowing.person !== person || duration <= 0 || person === null) {
            return false;
        }

        const borrowingDate = this.currentBorrowing.toDate;
        this.currentBorrowing.toDate = this.currentBorrowing.toDate.setDate(borrowingDate.getDate() + duration);

        return true;
    }

    isAvailable() {
        return this.currentBorrowing === null;
    }

    whenWillBeAvailable() {
        if (this.isAvailable) {
            return Date();
        }
        return this.currentBorrowing.toDate;
    }

    getBorrower() {
        if (this.isAvailable()) {
            return null;
        }
        return this.currentBorrowing.person;
    }
}

export default Book
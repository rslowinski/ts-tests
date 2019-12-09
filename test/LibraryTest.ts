import { expect } from 'chai';
import {Person} from "../src/Person";
import {Book} from "../src/Book";
import {Borrowing} from "../src/Borrowing";
import {Library} from "../src/Library";

function createLibrary() {
    const hamlet = new Book("#0", "Hamlet", "Sekspir");
    const lalka = new Book("#1", "Lalka", "Prus");
    const ferdydurke = new Book("#1", "Ferdydurke", "Gombrowicz");
    return new Library([hamlet, lalka, ferdydurke]);
}

function createPerson() {
    return new Person("John", "Carmack");
}

describe('In library', function () {

    it('one should be able to borrow a book', function () {
        const student = createPerson();
        const book = createLibrary().getFirstAvailableBookOrNull();

        expect(book.borrowBook(student, 4)).to.eq(true);
        expect(book.currentBorrowing.person).to.eq(student)
    });

    it('already borrowed book must not be borrowed again', function () {
        const horryPioter = new Book("#42", "Horry Pioter", "Madka");
        const library = new Library([horryPioter]);

        const student = createPerson();
        const anotherStudent = createPerson();
        const bookFromLibrary = library.getBookByNumber(horryPioter.number);

        const firstBorrowingResult = bookFromLibrary.borrowBook(student, 30);
        const anotherBorrowingResult = bookFromLibrary.borrowBook(anotherStudent, horryPioter.number);

        expect(firstBorrowingResult).to.eq(true);
        expect(anotherBorrowingResult).to.eq(false);
    });

    it('one should be able to return borrowed book', function () {
        const book = createLibrary().getFirstAvailableBookOrNull();
        const student = createPerson();

        book.borrowBook(student, 3);

        expect(book.returnBook(student)).to.eq(true);
        expect(book.isAvailable()).to.eq(true);
    });


    it('one must not be able to borrow a book that is already borrowed', function () {
        const student = createPerson();
        const student2 = createPerson();
        const book = createLibrary().getFirstAvailableBookOrNull();

        expect(book.borrowBook(student, 3)).to.eq(true);
        expect(book.borrowBook(student2, 3)).to.eq(false);
        expect(book.currentBorrowing.person).to.eq(student);
    });

    it('one must not be able to prolong book borrowed by someone else', function () {
        const student = createPerson();
        const student2 = new Person("John", "Carnegie");
        const book = createLibrary().getFirstAvailableBookOrNull();

        book.borrowBook(student, 3);

        expect(book.prolong(student2, 2)).to.eq(false);
    });

    it('one must not be able to prolong book borrowed by someone else', function () {
        const student = createPerson();
        const student2 = createPerson();
        const book = createLibrary().getAvailableBookOrNull("Lalka");

        expect(book.borrowBook(student, 3)).to.eq(true);
        expect(book.prolong(student2, 3)).to.eq(false);
        expect(book.currentBorrowing.person).to.eq(student);
    });

    it('one should be able to borrow a book after returning it', function () {
        const student = createPerson();
        const book = createLibrary().getFirstAvailableBookOrNull();

        expect(book.borrowBook(student, 3)).to.eq(true);
        expect(book.returnBook(student)).to.eq(true);
        expect(book.borrowBook(student, 3)).to.eq(true);
    });

    it('one must not be able to return book which is not borrowed', function () {
        const student = createPerson();
        const book = createLibrary().getFirstAvailableBookOrNull();

        expect(book.returnBook(student)).to.eq(false);
    });


    it('one should be able to prolong borrowing', function () {
        const student = createPerson();
        const book = createLibrary().getFirstAvailableBookOrNull();

        book.borrowBook(student, 4);

        let expectedDayAfterProlong = new Date();
        expectedDayAfterProlong.setDate(book.currentBorrowing.toDate.getDate() + 3);

        book.prolong(student, 3);
        let afterProlongDate = new Date(book.currentBorrowing.toDate);

        expect(afterProlongDate.getDate()).to.eq(expectedDayAfterProlong.getDate());
    });

    it('one should be able to see top borrowing', function () {
        const student = createPerson();
        const library = createLibrary();
        const  book = library.getFirstAvailableBookOrNull();

        book.borrowBook(student, 1);
        book.returnBook(student);

        book.borrowBook(student, 1);

        book.returnBook(student);
        book.borrowBook(student, 1);
        debugger;
        const book2 = library.getFirstAvailableBookOrNull();
        book2.borrowBook(student, 2);

        expect(library.getTopBorrowing()).to.eq(book);
    });

    it('should return amount of currently borrowed books', function () {
        const student = createPerson();
        const library = createLibrary();
        const book = library.getFirstAvailableBookOrNull();
        book.borrowBook(student, 1);

        const book2 = library.getFirstAvailableBookOrNull();
        book2.borrowBook(student, 1);

        expect(library.countBorrowedBooks()).to.eq(2);
    });

});
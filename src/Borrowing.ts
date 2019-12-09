export class Borrowing {
    person: string;
    fromDate: string;
    toDate: string;

    constructor(person, fromDate, toDate) {
        this.person = person;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}

export default Borrowing;
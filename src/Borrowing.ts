export class Borrowing {
    person: string;
    fromDate: Date;
    toDate: Date;

    constructor(person, fromDate, toDate) {
        this.person = person;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}

export default Borrowing;
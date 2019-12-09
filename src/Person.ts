export class Person {
    name: string;
    surname: string;
    age: number;

    constructor(name: string, surname: string, age: number = 25) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}


export default Person;
import { expect } from 'chai';
import {Person} from "../src/Person";

describe('library tests', () => {
    it('should sth', () => {
        const person = new Person("John", "Test", 10);
        expect(person.age).to.equal(10);
    });
});
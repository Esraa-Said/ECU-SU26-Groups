class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return `Hi, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age);
        this.jobTitle = jobTitle;
    }

    work() {
        return `${this.name} is working as a ${this.jobTitle}.`;
    }
}
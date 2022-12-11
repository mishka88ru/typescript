
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => {
	return n1 + n2;
}
console.log(add(1, 2));

interface AddFn2 {
	(a: number, b: number): number;
}
let add2: AddFn2;
add2 = (n1: number, n2: number) => {
	return n1 + n2;
}
console.log(add2(1, 2));

/////////////////////////////////////////

interface Named {
	readonly name: string;

	outputName?: string;
	printMe?(): void;

	printInfo(): void;
}

interface Greetable /*extends Named*/ {
	greet(phrase: string): void;
};

class Person implements Greetable, Named {
	constructor(public name: string, private age: number, public outputName?: string) { }

	greet(phrase: string): void {
		console.log(phrase, this.name);
	}

	printInfo() {
		console.log(this.name, this.age);
	}

	printMe() {
		console.log(this.outputName ? this.outputName : "noname");
	}
};

let user1: Greetable;
user1 = new Person("Mike", 34, "Mickey");
//user1.name = "Mickey";
(user1 as Person).printMe();

user1.greet("Hello");
(user1 as Person).printInfo();
(user1 as Person).outputName = "Mishka";
(user1 as Person).printMe();

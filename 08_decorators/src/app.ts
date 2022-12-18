
console.log("A");

function Logger(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	}
}

function WithTemplate(template: string, hookID: string) {
	return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
		return class extends originalConstructor {
			constructor(..._: any[]) {
				super();
				console.log("Rendering template");
				const hookEL = document.getElementById(hookID);
				if (hookEL) {
					hookEL.innerHTML = template;
					hookEL.querySelector("h1")!.textContent = this.name;
				}
			}
		}
	}
}

console.log("B");

@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
	name = "Mike";

	constructor() {
		console.log("Person.constructor()");
	}

	print() {
		console.log(this.name);
	}
}

console.log("C");

const p1 = new Person();
console.log(p1);

console.log("D");


function Log(target: any, propertyName: string | Symbol) {
	console.log("Property decorator");
	console.log(target, propertyName);
}
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
	console.log("Accessor decorator");
	console.log(target, name, descriptor);
}
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
	console.log("Method decorator");
	console.log(target, name, descriptor);
}
function Log4(target: any, name: string | Symbol, position: number) {
	console.log("Parameter decorator");
	console.log(target, name, position);
}


class Product {
	@Log
	private _title: string;
	@Log
	private _price: number;

	@Log2
	set price(val: number) {
		if (val > 0)
			this._price = val;
		else
			throw new Error("Invalid price")
	}
	get price() {
		return this._price;
	}

	constructor(t: string, p: number) {
		this._title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}

	printProduct() {
		console.log(this._title, this._price);
	}
}



function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	console.log("Autobind decorator");
	const originalMethod = descriptor.value;
	const adjustedDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFunc = originalMethod.bind(this);
			return boundFunc;
		}
	};
	return adjustedDescriptor;
}

class Printer {
	message = "This worked!";

	@Autobind
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);//.bind(p));



interface ValidatorConfig {
	[property: string]: {
		[validatableProp: string]: string[] // ["required", "positive"]
	}
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ["required"]
	};
}

function PositiveNumber(target: any, propName: string) {
	registeredValidators[target.constructor.name] = {
		...registeredValidators[target.constructor.name],
		[propName]: ["positive"]
	};
}

function validate(obj: any): boolean {
	const objValidatorConfig = registeredValidators[obj.constructor.name];
	if (!objValidatorConfig)
		return true;
	
	let ok = true;
	for (const prop in objValidatorConfig) {
		console.log(prop);
		for (const validator of objValidatorConfig[prop]) {
			switch (validator) {
				case "required": ok = ok && !!obj[prop];     break;
				case "positive": ok = ok &&   obj[prop] > 0; break;
			}
		}
	}
	return ok;
}

class Course {
	@Required
	title: string;

	@PositiveNumber
	price: number;

	constructor(t: string, p: number) {
		this.title = t;
		this.price = p;
	}
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
	event.preventDefault();
	const title =  (document.getElementById("title") as HTMLInputElement).value;
	const price = +(document.getElementById("price") as HTMLInputElement).value;

	const c = new Course(title, price);
	if (!validate(c))
		alert("Invalid input");
	else
		console.log(c);
});

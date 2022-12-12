
type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
}

type ElevatedEmployee = Admin & Employee; // all of them

const e1: ElevatedEmployee = {
	name: "Mike",
	privileges: ["create-server"],
	startDate: new Date()
}

type Combinable = string | number;
type Numeric    = number | boolean;
type NumberType = Combinable & Numeric;  // only the same
type Universal  = Combinable | Numeric;

const var1: NumberType = 12;
const var2: Universal  = "12";

console.log(e1, var1, var2);


function add(a: Combinable, b: Combinable) {
	if (typeof a === "string" || typeof b === "string") {
		return a.toString() + b.toString();
	}
	return +a + +b;
}

console.log(add(var1, var1));
console.log(add(var2, var2));
console.log(add(var1, var2));


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	console.log("Name:", emp.name);
	if ("startDate" in emp) {
		console.log("Start Date:", emp.startDate);
	}
	if ("privileges" in emp) {
		console.log("Privileges:", emp.privileges);
	}
}
printEmployeeInformation(e1);


class Car {
	drive() {
		console.log("Driving a car...");
	}
}
class Truck {
	drive() {
		console.log("Driving a truck...");
	}

	loadCargo(amount: number) {
		console.log("Loading cargo,", amount)
	}
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
	v.drive();
	if (v instanceof Truck)
		v.loadCargo(100);
}

useVehicle(v1);
useVehicle(v2);


interface Bird {
	type: "bird";
	flyingSpeed: number;
}

interface Horse {
	type: "horse";
	runningSpeed: number;
}

const a1: Bird  = { type: "bird",  flyingSpeed: 100 };
const a2: Horse = { type: "horse", runningSpeed: 20 };

type Animal = Bird | Horse;
function moveAnimal(a: Animal) {
	let speed: number;
	switch (a.type) {
		case "bird":  speed = a.flyingSpeed;  break;
		case "horse": speed = a.runningSpeed; break;
	}
	console.log("Moving with speed", speed);
}

moveAnimal(a1);
moveAnimal(a2);


const inp1 = document.getElementById("user-input1")! as HTMLInputElement;
const inp2 = <HTMLInputElement>document.getElementById("user-input2")!;
inp1.value = "Hi there!";
inp2.value = "Hello";



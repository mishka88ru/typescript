
class Department {
	//private readonly id: string;
	//name: string;

	private employees: string[] = [];


	constructor(private readonly id: string, public name: string) {
	//	this.name = name;
	}

	describe(this: Department) { // see copyAccounting below
		console.log(`Department [${this.id}] name is ${this.name}!`);
	}

	addEmployee(e: string) {
	//	this.id = e; // readonly
		this.employees.push(e);
	}

	printEmployeeInformation() {
		console.log(this.employees.length);
		console.log(this.employees);
	}
};


const accounting = new Department("dep1", "Accounting");

accounting.addEmployee("Mike");
accounting.addEmployee("Mickey");
//accounting.employees[2] = "Michael";
accounting.printEmployeeInformation();

console.log(accounting, accounting.name);
accounting.describe();

//const copyAccounting = { describe: accounting.describe };
//copyAccounting.describe();
//const copyAccounting2 = { name: "Hackery", describe: accounting.describe }; // need Employee functionality now
//copyAccounting2.describe();


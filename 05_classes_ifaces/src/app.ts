
abstract class Department {
	//private readonly id: string;
	//name: string;

	protected employees: string[] = [];

	static FiscalYear = 2022;

	static createEmployee(name: string) {
		return { name: name };
	}


	constructor(private readonly id: string, public name: string) {
	//	this.name = name;
	}

	abstract describe(this: Department): void;
//	{ console.log(`Department [${this.id}] name is ${this.name}, number of it's members is ${this.employees.length}.`); }

	addEmployee(e: string) {
	//	this.id = e; // readonly
		this.employees.push(e);
	}

	printEmployeeInformation() {
		console.log(`Department [${this.id}] has`, this.employees.length, "emplyees");
		console.log(this.employees);
	}
};

class ITDepartment extends Department {
	constructor(id: string, public admins: string[]) {
		super(id, "Information Technology");
		admins.forEach(e => {
			this.addEmployee(e);
		});
	}

	describe(this: Department): void {
	//	super.describe();
		console.log("BTW, brilliant hackers from IT welcomes you!");
	}
};

class AccountingDepartment extends Department {
	describe(this: Department): void {
		console.log("Guys responsible for all troubles in the company.")
	}

	private lastReport: string;

	get LastReport() {
		if (this.lastReport && this.lastReport.length > 0)
			return this.lastReport;
		throw new Error("No report found.");
	}

	set LastReport(text: string) {
		if (!text)
			throw new Error("Invalid report.");
		this.addReport(text);
	}

	private constructor(id: string, private reports: string[]) {
		super(id, "Accounting");
		this.lastReport = reports.length > 0 ? reports[reports.length - 1] : "";
	}

	private static instance: AccountingDepartment;
	static getInstance() {
		if (!this.instance)
			this.instance = new AccountingDepartment("dep-acc", []);
		return this.instance;
	}

	addReport(text: string) {
		this.reports.push(text);
		this.lastReport = text;
	}

	printReports() {
		console.log(this.reports);
	}

	addEmployee(name: string): void {
		if (name === "Mishka") {
			this.addReport("This name could not be used.");;
			return;
		}
		this.employees.push(name);
	}
};

const accounting = AccountingDepartment.getInstance();//new AccountingDepartment("dep1", []);

accounting.addEmployee("Mike");
accounting.addEmployee("Mishka");
accounting.addEmployee("Mickey");

accounting.addReport("Something went wrong!!");
console.log(accounting.LastReport);
accounting.LastReport = "Disastrous events are happening the machinery hall. Right NOW!!!";

accounting.describe();
accounting.printEmployeeInformation();
accounting.printReports();

const emp1 = Department.createEmployee("Mikhail");
console.log(emp1, ITDepartment.FiscalYear);

const it = new ITDepartment("dep2", [ "Alex" ]);
it.describe();
it.printEmployeeInformation();

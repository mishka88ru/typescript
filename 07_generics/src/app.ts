
const names: Array<string> = [ "Mike", "Michael" ];
console.log(names.join(" "));

const promise: Promise<string> = new Promise((resolve, _) => {
	setTimeout(() => {
		resolve("This is done!");
	}, 2000);
});

promise.then(data => {
	console.log(data.split(" "));
});


function merge<T1 extends object|number, T2 extends object>(a: T1, b: T2) {
	return Object.assign({}, a, b);
}

const res1 = merge({name:"Mike"}, {age:34});
const res2 = merge({name:"Mike", gender:"male"}, {age:34});
console.log("My age is " + res1.age);
console.log("I am", res2);
//console.log("I am...", merge({name:"Mike", gender:"male"}, 34));

interface Lengthy {
	length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descr = "Got no value.";
	if (element.length > 0) {
		descr = "Elements count: " + element.length;
	}
	return [element, descr];
}
console.log(countAndDescribe("Hi there!"));
console.log(countAndDescribe(["sports", "cooking"]));
console.log(countAndDescribe([]));
//console.log(countAndDescribe(34));


function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
	return "Value: " + obj[key];
}

//console.log(extractAndConvert({}, "name"));
console.log(extractAndConvert({name: "Mike"}, "name"));



class DataStorage<T extends string | number | boolean> {
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		let index = this.data.indexOf(item);
		if (index != -1)
			this.data.splice(index, 1);
	}

	getItems() {
		return [...this.data];
	}
};

let nums = new DataStorage<number>;
nums.addItem(1);
nums.addItem(2);
nums.addItem(3);
nums.removeItem(2);
console.log(nums.getItems());

let texts = new DataStorage<string>;
texts.addItem("QWE");
texts.addItem("ASD");
texts.addItem("ZXC");
texts.removeItem("QWE");
console.log(texts.getItems());
/*
let me = new DataStorage<object>;
me.addItem({name:"Mike"});
me.addItem({name:"Michael"});
me.removeItem({name:"Mike"}); // new object, new address
console.log(me.getItems());   // will not be found therefor
*/

interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
};

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
//	return { title, description, completeUntil: date };
	let goal: Partial<CourseGoal> = {};
	goal.title = title;
	goal.description = description;
	goal.completeUntil = date;
	return goal as CourseGoal;
}

const my_names: Readonly<string[]> = [ "Mike", "Mishka" ];
//my_names.push("Michael");
console.log(my_names);

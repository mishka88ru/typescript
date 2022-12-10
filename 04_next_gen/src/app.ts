
const userName = "Mike";
//userName = "Mickey";

let age = 33;
age++;

console.log(userName, age);



function add(a: number, b: number) {
	var result1 = age * 2;
	let result2 = age / 2;
	{
		var result3 = a + b;
	//	let result4 = a + b;
	}
	console.log(result1, result2, result3/*, result4*/);
}

add(10, 20);

const add2 = (a: number, b: number = 1) => {
	return a + b;
}

const add3 = (a: number, b: number) => a + b;

console.log(add2(3));
console.log(add3(3, 4));

type PRINTER = (output: string | number) => void;

const printOutput: PRINTER = output => console.log(output);
printOutput("QWE");

const button = document.querySelector("button");
if (button) {
	button.addEventListener("click", event => console.log("Clicked", event));
}


const hobbies = [ "Sports", "Cooking" ];
const activeHobbies = [ "Hiking" ]

//activeHobbies.push(hobbies[0], hobbies[1]);
activeHobbies.push(...hobbies);
console.log(activeHobbies);
console.log(...activeHobbies);


const person = {
	name: "Mike",
	age: 33
};
const copiedPerson = person; // ref
copiedPerson.age++;
console.log(person);

const realCopy = { ...person };
realCopy.name = "Mickey";
realCopy.age++;
console.log(realCopy, person);


const mul = (...nums: number[]) => {
	let res = nums.reduce((cur, val) => {
		return cur * val;
	}, 1);
	return res;
};
const multiply = mul(1, 2, 3, 4, 5);
console.log(multiply);


//const hobby1 = hobbies[0];
//const hobby2 = hobbies[1];
const [hobbyA, hobbyB, ...otherHobbies] = activeHobbies;
console.log(hobbyA, hobbyB, otherHobbies);


const { name: myName, age: myAge } = person;
console.log(myName, myAge);

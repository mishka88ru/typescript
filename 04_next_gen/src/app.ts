
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

const add2 = (a: number, b: number) => {
	return a + b;
}

const add3 = (a: number, b: number) => a + b;

console.log(add2(3, 4));
console.log(add3(3, 4));

type PRINTER = (output: string | number) => void;

const printOutput: PRINTER = output => console.log(output);
printOutput("QWE");

const button = document.querySelector("button");
if (button) {
	button.addEventListener("click", event => console.log("Clicked", event));
}

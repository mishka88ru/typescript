
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
	if (showResult)
		console.log(phrase, typeof n1, n1 + n2);
	return n1 + n2;
}

let num1: number;
const num2 = 2.8;

const printResult = true;

num1 = 5;

const result = add(num1, num2, printResult, "Result is");
console.log(result);

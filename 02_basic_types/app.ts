
let userInput: unknown; //any
let userName: string;

userInput = 34;
userInput = "Mike";
if (typeof userInput === "string")
	userName = userInput;

console.log(userInput);

function generateError(message: string, code: number): never {
//	if (code == 0) return;
	if (code = 1) {
		while (true) {}
	}
	throw { message: message, errorCode: code };
}

const res = generateError("Some error", 500);
console.log(res);

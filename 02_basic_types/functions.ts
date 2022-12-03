
function add(n1: string, n2: string): number {
	return +n1 + +n2;
}

function printResult(num: number): void {
	console.log("Result: " + num);
//	return 0;
}

const result = add("1", "2");
console.log(printResult(result));

let combineValues: (_1: string, _2: string) => number;
combineValues = add;
// combineValues = printResult;
console.log(combineValues("3", "4"));


function addAndHandle(n1: number, n2: number, cb: (number) => void) {
	cb(n1 + n2);
}
addAndHandle(10, 20, (v) => {
	console.log(v);
});

function sendRequest(data: string, cb: (response: any) => void) {
	// ... sending a request with "data"
	return cb({data: 'Hi there!'});
}

sendRequest('Send this!', (response) => { 
	console.log(response);
	return true;
});

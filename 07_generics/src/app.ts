
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


function merge<T1, T2>(a: T1, b: T2) {
	return Object.assign({}, a, b);
}

const res1 = merge({name:"Mike"}, {age:34});
const res2 = merge({name:"Mike", gender:"male"}, {age:34});
console.log("My age is " + res1.age);
console.log("I am", res2);

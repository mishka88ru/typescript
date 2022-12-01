
type Combinable = number | string;
type ConversionDescriptor = "num" | "text";

function combine(
	n1:  Combinable, 
	n2:  number | string, 
	conv: ConversionDescriptor
) {
	let result;
	if ((typeof n1 === "number" && typeof n2 === "number") || (conv == "num"))
		result = +n1 + +n2;
	else
		result = n1.toString() + " " + n2.toString();

	if (conv === "num")
		return +result;
	else
		return result.toString();
}

const combineArgs = combine(17, 3, "num");
console.log(combineArgs);

const combineArgs2 = combine("17", "3", "num");
console.log(combineArgs2);

const combineNames = combine("Mike", "B", "text");
console.log(combineNames);

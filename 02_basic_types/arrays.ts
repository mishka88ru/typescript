
const person = {
	name: "Mike",
	age: 30,
	hobbies: [ "Sports", "Cooking" ]
};

let favoriteActivities: string[];
// favoriteActivities = "Reading";

console.log(person);
person.hobbies[2] = "Reading";

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase());
}

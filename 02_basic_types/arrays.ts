
const person = {
	name: "Mike",
	age: 30,
	hobbies: [ "Sports", "Cooking" ]
};

let favoriteActivities: string[];
// favoriteActivities = "Reading";

console.log(person);

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase());
}

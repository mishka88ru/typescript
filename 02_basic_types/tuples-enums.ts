
enum Role {
	ADMIN, READ_PNLY, AUTHOR
}

type Person = {
	name: string;
	age: number;
	hobbies: string[];
	role: [number, Role];
}

let person: Person = {
	name: "Mike",
	age: 30,
	hobbies: [ "Sports", "Cooking" ],
	role: [2, Role.AUTHOR]
};

person.role[0] = 10;

let favoriteActivities: any[];
favoriteActivities = ["Reading"];

console.log(person);
person.hobbies[2] = "Reading";

for (const hobby of person.hobbies) {
	console.log(hobby.toUpperCase());
}

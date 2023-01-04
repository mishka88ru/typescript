
import _ from "lodash";
console.log(_.shuffle([1, 2, 3, 4]));


declare var GLOBAL: string;
console.log(GLOBAL);


import { Product } from "./product.model";
const p1 = new Product("Book", 12.34);
console.log(p1.getInformation());

import "reflect-metadata";
import { plainToInstance } from "class-transformer";
const products = [
	{ title: "Carpet", price: 44.11 },
	{ title: "Car",    price: -3333.22 },
];
// const loadedProducts = products.map(prod => {
// 	return new Product(prod.title, prod.price);
// });
const loadedProducts = plainToInstance(Product, products);
for (const prod of loadedProducts) {
	console.log(prod.getInformation());
}


import { validate } from "class-validator";
const p2 = new Product("", -12.34);
validate(p2).then(errors => {
	console.log(errors.length === 0 ? console.log(p2.getInformation()) : errors);
});

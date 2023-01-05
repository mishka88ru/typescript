
import { RequestHandler } from "express-serve-static-core";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [
	{ id: "1", text: "Hello World!" },
	{ id: "2", text: "Watch the '10th Kingdom' once again" },
];

interface TodoBody {
	text: string;
}

interface TodoUpdate {
	id: string;
}

export const createTodo: RequestHandler = (req, resp, next) => {
	const body = req.body as TodoBody;
	const newTodo = new Todo(Math.random().toString(), body.text);
	TODOS.push(newTodo);
	console.log(body, newTodo);
	resp.status(201).json({message: "Created the todo", createdTodo: newTodo});
};

export const getTodos: RequestHandler = (req, resp, next) => {
	resp.json({todos: TODOS});
}

export const updateTodo: RequestHandler<TodoUpdate> = (req, resp, next) => {
	const todoID = req.params.id;
	const todoIndex = TODOS.findIndex(t => t.id == todoID);
	if (todoIndex < 0) {
		throw new Error("Can't find the TODO to be updated!");
	}

	const body = req.body as TodoBody;
	TODOS[todoIndex].text = body.text;
	resp.status(200).json({message: "Updated", updatedTodo: TODOS[todoIndex]});
}

export const deleteTodo: RequestHandler<TodoUpdate> = (req, resp, next) => {
	const todoID = req.params.id;
	const todoIndex = TODOS.findIndex(t => t.id == todoID);
	if (todoIndex < 0) {
		throw new Error("Can't find the TODO to be deleted!");
	}

	const todo = TODOS[todoIndex];
	TODOS.splice(todoIndex, 1);
	resp.status(200).json({message: "Deleted", deletedTodo: todo});
}

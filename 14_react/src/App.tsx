import React, { useState } from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

import Todo from "./todo.model";


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Math.random().toString(), text: text }
    ]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  }

  return (
    <div className="App">
      <p>Hello</p>
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onTodoDeleteHandler={todoDeleteHandler} />
    </div>
  );
};

export default App;

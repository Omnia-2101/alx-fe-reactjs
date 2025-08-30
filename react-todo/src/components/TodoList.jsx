import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: task, done: false }]);
    setTask('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        data-testid="todo-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button data-testid="add-button" onClick={addTodo}>Add</button>
      <ul data-testid="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              data-testid="todo-text"
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

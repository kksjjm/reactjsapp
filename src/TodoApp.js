import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title, status) => {
    const newTodo = { id: Date.now(), title, status };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updatedTitle, updatedStatus) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle, status: updatedStatus } : todo));
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      ))}
    </ul>
  );
};

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);

  const handleUpdate = () => {
    updateTodo(todo.id, title, status);
    setEditMode(false);
  };

  return (
    <li>
      {editMode ? (
        <div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="to do">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <span>{todo.title} - {todo.status}</span>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('to do');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTodo(title, status);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a new task" />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="to do">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoApp;

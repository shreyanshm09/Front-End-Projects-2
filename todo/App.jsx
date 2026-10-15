import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Add new task
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = task.trim();
    if (!title) return;

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  // Mark task complete or incomplete
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Enter editing mode
  const startEdit = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  // Save edited task
  const saveEdit = (id) => {
    const trimmedText = editText.trim();
    if (!trimmedText) return;

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedText } : todo
      )
    );
    setEditingId(null);
    setEditText("");
  };

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true; // "All"
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Active", "Completed"].map((type) => (
          <button
            key={type}
            className={filter === type ? "active" : ""}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo List Items */}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingId === todo.id ? (
              // Edit Mode UI
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              // Normal Mode UI
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-text">{todo.title}</span>
                <button onClick={() => startEdit(todo.id, todo.title)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

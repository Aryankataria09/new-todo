import React, { useState } from "react";

function Assignment2() {
  const [task, setTask] = useState(""); // To store input text
  const [todos, setTodos] = useState([]); // To store list of tasks

  // Function to add new task
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task!");
    } else {
      const newTodo = { id: Date.now(), text: task, completed: false };
      setTodos([...todos, newTodo]);
      setTask("");
      alert("Task added successfully!");
    }
  };

  // Function to mark task complete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 Simple To-Do List</h1>

      {/* Input field and button */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ marginRight: "10px" }} // small gap
      />
      <button onClick={addTask}>Add</button>

      {/* Box for tasks with scroll */}
      <div
        style={{
          width: "300px",
          margin: "20px auto",
          border: "1px solid gray",
          padding: "10px",
          maxHeight: "150px",
          overflowY: "auto",
          textAlign: "left", // tasks aligned to left
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {todos.map((todo, index) => (
            <li key={todo.id} style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  marginLeft: "8px",
                }}
              >
                {index + 1}. {todo.text}
              </span>
            </li>
          ))}
        </ul>

        {/* Message if no tasks */}
        {todos.length === 0 && (
          <p style={{ textAlign: "center" }}>No tasks yet!</p>
        )}
      </div>
    </div>
  );
}

export default Assignment2;

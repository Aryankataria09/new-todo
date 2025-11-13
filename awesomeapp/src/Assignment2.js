import React, { useState } from "react";

function Assignment2() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // For editing
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // For confirmation box
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(""); // "edit" or "delete"
  const [selectedId, setSelectedId] = useState(null);

  // Add task
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

  // Mark complete
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Confirmation Functions//
  const openConfirmBox = (type, id, text = "") => {
    setConfirmType(type); // edit or delete
    setSelectedId(id);
    setEditingText(text);
    setShowConfirm(true);
  };

  const cancelAction = () => {
    setShowConfirm(false);
    setSelectedId(null);
  };

  const continueAction = () => {
    if (confirmType === "edit") {
      setEditingId(selectedId); // allow editing
    } else if (confirmType === "delete") {
      const updated = todos.filter((todo) => todo.id !== selectedId);
      setTodos(updated);
    }
    setShowConfirm(false);
  };

  // Save edited text
  const saveTask = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingId(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📝 Simple To-Do List</h1>

      {/* Input box */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={addTask}>Add</button>

      {/* Task list */}
      <div
        style={{
          width: "300px",
          margin: "20px auto",
          border: "1px solid gray",
          padding: "10px",
          maxHeight: "200px",
          overflowY: "auto",
          textAlign: "left",
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo, index) => (
            <li key={todo.id} style={{ marginTop: "10px" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              {/* Editing mode */}
              {editingId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{ marginLeft: "8px" }}
                  />

                  <button onClick={() => saveTask(todo.id)} style={{ marginLeft: "5px" }}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      marginLeft: "8px",
                    }}
                  >
                    {index + 1}. {todo.text}
                  </span>

                  <button
                    onClick={() => openConfirmBox("edit", todo.id, todo.text)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openConfirmBox("delete", todo.id)}
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p style={{ textAlign: "center" }}>No tasks yet!</p>}
      </div>

      {/* -------- Confirmation Box -------- */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              width: "300px",
            }}
          >
            <h3>Are you sure you want to {confirmType} this?</h3>

            <button
              onClick={continueAction}
              style={{
                background: "green",
                color: "white",
                padding: "8px 15px",
                marginRight: "10px",
                borderRadius: "5px",
              }}
            >
              Continue
            </button>

            <button
              onClick={cancelAction}
              style={{
                background: "red",
                color: "white",
                padding: "8px 15px",
                borderRadius: "5px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignment2;

import React, { useState } from "react";

function Assignment2() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // For editing
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Confirmation Box
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(""); // "edit" or "delete"
  const [selectedId, setSelectedId] = useState(null);

  // Add Task
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

  // Mark Complete
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Confirm Box Open
  const openConfirmBox = (type, id, text = "") => {
    setConfirmType(type);
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
      setEditingId(selectedId);
    } else if (confirmType === "delete") {
      setTodos(todos.filter((todo) => todo.id !== selectedId));
    }
    setShowConfirm(false);
  };

  // Save Edited Task
  const saveTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
        minHeight: "100vh",
        paddingTop: "30px",
        background: "linear-gradient(135deg, #4b3f72, #2c2a4a, #1e1a33)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "35px", marginBottom: "20px" }}>
         To-Do List
      </h1>

      {/* Input Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{
            padding: "10px",
            width: "230px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#d4af37",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#c29b27")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#d4af37")}
        >
          Add
        </button>
      </div>

      {/* Tasks Box */}
      <div
        style={{
          width: "350px",
          margin: "0 auto",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          backgroundColor: "white",
          maxHeight: "260px",
          overflowY: "auto",
          color: "black",
        }}
      >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderLeft: todo.completed
                  ? "5px solid green"
                  : "5px solid #ccc",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />

                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #aaa",
                      }}
                    />
                    <button
                      onClick={() => saveTask(todo.id)}
                      style={{
                        marginLeft: "5px",
                        padding: "5px 8px",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <span
                    style={{
                      marginLeft: "12px",
                      textDecoration: todo.completed
                        ? "line-through"
                        : "none",
                      fontSize: "16px",
                    }}
                  >
                    {index + 1}. {todo.text}
                  </span>
                )}
              </div>

              {!editingId && (
                <div>
                  <button
                    onClick={() =>
                      openConfirmBox("edit", todo.id, todo.text)
                    }
                    style={{
                      marginRight: "6px",
                      padding: "4px 7px",
                      backgroundColor: "#ffc107",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => openConfirmBox("delete", todo.id)}
                    style={{
                      padding: "4px 7px",
                      backgroundColor: "#ff4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>No tasks yet!</p>
        )}
      </div>

      {/* Confirmation Box */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
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
              padding: "25px",
              borderRadius: "12px",
              width: "300px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "black" }}>
              Are you sure you want to{" "}
              <b>{confirmType}</b> this?
            </h3>

            <button
              onClick={continueAction}
              style={{
                background: "green",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Continue
            </button>

            <button
              onClick={cancelAction}
              style={{
                background: "red",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
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

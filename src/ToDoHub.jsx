import React, { useState, useEffect } from 'react';

const ToDoHub = () => {
  const [currentUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user ? user.email : null;
  });

  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    return savedTodos;
  });
  useEffect(() => {
  }, []);

  const updateStatus = (todoId, currentStatus) => {
    const updatedStatus = currentStatus === "completed" ? "pending" : "completed";
    
    const updatedTodos = todos.map(todo =>
      todo._id === todoId ? { ...todo, status: updatedStatus } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("allTodos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="todo-hub-container">
      <h1 className="todo-hub-title">📝 ToDo Hub - All Tasks</h1>

      <div className="todo-hub-grid">
        {todos.length === 0 ? (
          <p className="todo-hub-empty">No tasks found.</p>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-card">
              <h3>{todo.title}</h3>

              {Array.isArray(todo.description) && todo.description.length > 0 ? (
                <ul className="todo-description">
                  {todo.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              ) : (
                <p className="todo-description">No description</p>
              )}

              <p className="todo-user">
                👤 {todo.user?.name || "Unknown User"}
              </p>

              <p className={`todo-status ${todo.status === "completed" ? 'done' : 'pending'}`}>
                {todo.status === "completed" ? '✅ Completed' : '⌛ Pending'}
              </p>

              {todo.user?.email === currentUserId && (
                <button
                  className={`status-btn ${todo.status === "completed" ? 'completed' : 'pending'}`}
                  onClick={() => updateStatus(todo._id, todo.status)}
                >
                  Mark as {todo.status === "completed" ? "Pending" : "Completed"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToDoHub;
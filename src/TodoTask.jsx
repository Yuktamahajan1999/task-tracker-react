import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TodoTask() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [todos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    if (user) {
      return savedTodos.filter(todo => todo.userEmail === user.email);
    }
    return [];
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="todo-list-container">
      <h2>📋 All Your To-Dos</h2>
      
      {todos.length === 0 ? (
        <p>No tasks yet. Time to get productive! 💪</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo._id} className="todo-item-list">
              <span className="todo-title">{todo.title}</span>
              {Array.isArray(todo.description) && (
                <ul>
                  {todo.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoTask;
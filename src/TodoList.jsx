import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import InputArea from "./InputArea";
import './App.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function TodoList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [items, setItems] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    if (user) {
      return savedTodos.filter(todo => todo.userEmail === user.email);
    }
    return [];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ _id: null, title: '', description: [] });
  const [loading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
    }
  }, [user, navigate]);

  function toggleStatus(id) {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    const updatedAllTodos = allTodos.map(todo => {
      if (todo._id === id) {
        return { ...todo, status: todo.status === "completed" ? "pending" : "completed" };
      }
      return todo;
    });

    localStorage.setItem("allTodos", JSON.stringify(updatedAllTodos));
    setItems(updatedAllTodos.filter(todo => todo.userEmail === user.email));
    toast.success("Status updated!", { autoClose: 500 });
  }

  // Add Item
  function addItem({ title, description: descriptionArray, status = "pending" }) {
    if (!title || !descriptionArray.length) {
      toast.error("Title and description are required.");
      return;
    }

    const newTodo = {
      _id: Date.now().toString(),
      title,
      description: descriptionArray,
      status,
      userEmail: user.email,
      user: { name: user.name }
    };

    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    localStorage.setItem("allTodos", JSON.stringify([...allTodos, newTodo]));
    setItems((prevItems) => [...prevItems, newTodo]);
    toast.success("Task added successfully!", { position: "top-center", autoClose: 1000 });
  }

// Delete Item
  function deleteItem(id) {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    const updatedAllTodos = allTodos.filter((item) => item._id !== id);
    localStorage.setItem("allTodos", JSON.stringify(updatedAllTodos));
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.success("Task deleted successfully!", { position: "top-center", autoClose: 1000 });
  }

  function editItem(id, title, description) {
    setIsEditing(true);
    setCurrentItem({ _id: id, title, description });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Update Item
  function updateItem(title, descriptionArray) {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];

    const updatedAllTodos = allTodos.map((item) =>
      item._id === currentItem._id
        ? {
          ...item,
          title,
          description: descriptionArray,
          status: "pending"
        }
        : item
    );

    localStorage.setItem("allTodos", JSON.stringify(updatedAllTodos));
    setItems(updatedAllTodos.filter(todo => todo.userEmail === user.email));

    setIsEditing(false);
    setCurrentItem({ _id: null, title: '', description: [] });
    toast.success("Task updated and set to pending!", { position: "top-center", autoClose: 1000 });
  }

  return (
    <div className="container">
      <h2 className="welcome-text">
        {user && user.name ? `Welcome ${user.name}` : 'Welcome to Daily Task Manager'}
      </h2>

      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      <InputArea
        key={isEditing ? currentItem._id : "new-task"}
        onAdd={addItem}
        onUpdate={updateItem}
        isEditing={isEditing}
        currentItem={currentItem}
      />

      {loading ? (
        <p>Loading your tasks...</p>
      ) : (
        <ul>
          {items.map((todoItem) => (
            <TodoItem
              key={todoItem._id}
              id={todoItem._id}
              title={todoItem.title}
              description={todoItem.description}
              status={todoItem.status}
              onDelete={deleteItem}
              onEdit={editItem}
              onToggleStatus={toggleStatus}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function TodoItem(props) {
  return (
    <div className={`todo-item ${props.status}`}>
      <div className="todo-content" onClick={() => props.onToggleStatus(props.id)}>
        <div className="todo-text">
          {props.status === "completed" ? (
            <CheckCircleIcon className="status-icon done" />
          ) : (
            <RadioButtonUncheckedIcon className="status-icon" />
          )}
          <span>{props.title}</span>
        </div>
        
        {Array.isArray(props.description) && (
          <ul className="todo-description">
            {props.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        )}

        <div className={`status-label ${props.status}`}>
          {props.status === "completed" ? "✓ Completed" : "⌛ Pending"}
        </div>
      </div>

      <div className="button-group">
        <button onClick={(e) => { e.stopPropagation(); props.onEdit(props.id, props.title, props.description); }}>
          <EditIcon fontSize="small" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); props.onDelete(props.id); }}>
          <DeleteIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
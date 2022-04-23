import React from 'react'

export const TodoItem = ({ todo, onDelete }) => {
  let myStyle = {
    width: "18rem",
  };
  return (
    <div className = "my-3">
      <div className="card" style={myStyle}>
        <div className="card-body">
          <h5 className="card-title">{todo.title}</h5>
          <p className="card-text">{todo.desc}</p>
          <button className="btn btn-sm btn-danger" onClick={() => { onDelete(todo) }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

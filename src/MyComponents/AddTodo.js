import React, { useEffect, useState } from 'react';
import Styles from "./../styles";

export const AddTodo = (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    let myStyle = props.myStyle;
    
    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            props.addTodo(title, desc);
            setTitle("");
            setDesc("");
        }
    }
    return (
        <div className="container my-3" style={myStyle}>
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3" style={myStyle}>
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}

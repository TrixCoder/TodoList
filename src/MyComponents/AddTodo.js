import React, { useState, useEffect } from 'react';
const axios = require("axios");

export const AddTodo = ({ addTodo }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [theme, settheme] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:5000/getTheme").then((res) => {
            settheme(res.data);
        })
    }, [theme]);

/* To modify for theme

    let darkStyle = {
        text: {},
        changeThemeBtn: "btn btn-light"
    };

    let lightStyle = {
        navClass: "navbar navbar-expand-lg navbar-light bg-light",
        changeThemeBtn: "btn btn-dark"
    };

    const [myStyle, setmyStyle] = useState("");
    const [btntxt, setbtntxt] = useState("");
    useEffect(() => {
        axios.get("http://localhost:5000/getTheme").then((res) => {
            let darkStyle = {
                navClass: "navbar navbar-expand-lg navbar-dark bg-dark",
                changeThemeBtn: "btn btn-light"
            };

            let lightStyle = {
                navClass: "navbar navbar-expand-lg navbar-light bg-light",
                changeThemeBtn: "btn btn-dark"
            };

            setmyStyle((res.data[0].theme === "Light") ? darkStyle : lightStyle);
        })
    }, [myStyle])
    useEffect(() => {
        axios.get("http://localhost:5000/getTheme").then((res) => {
            setbtntxt((res.data[0].theme === "Light") ? "Dark" : "Light");
        })
    }, [btntxt])

    */

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Title or Description cannot be blank");
        }
        else {
            addTodo(title, desc);
            axios.post("http://localhost:5000/todos", { title, desc })
                .catch(err => console.log(err));
            setTitle("");
            setDesc("");
        }
    }
    return (
        <div className="container my-3">
            <h3>Add a Todo</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" />
                </div>
                <button type="submit" className="btn btn-sm btn-success">Add Todo</button>
            </form>
        </div>
    )
}

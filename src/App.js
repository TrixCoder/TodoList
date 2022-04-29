import './App.css';
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import { About } from "./MyComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';


function App() {
  let initTodo;
  let todoTheme = "";
  axios.get("http://localhost:5000/getTheme").then((res) => {
    todoTheme = res.data.theme;
  })
  axios.get("http://localhost:5000/getTodos").then((res) => {
    initTodo = res.data;
  })
  if (initTodo === null) {
    initTodo = [];
  }
  if (todoTheme === null) {
    todoTheme = "dark";
  }

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    axios.post("http://localhost:5000/updateTodos", { change: "delete", stuff: todo }).catch(err => console.log(err));
  }

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
  }


  let bgImg = { backgroundImage: `url("./images/background.jpeg")` };
  let wgImg = { backgroundColor: "white" };

  const [theme, settheme] = useState([]);
  const [todos, setTodos] = useState([]);
  const [background, setBackground] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/getTodos").then((res) => {
      setTodos(res.data);
    })
  }, [todos])
  useEffect(() => {
    axios.get("http://localhost:5000/getTheme").then((res) => {
      settheme(res.data);
      setBackground(res.data[0].theme === "Dark" ? bgImg : wgImg);
    })
  }, [theme])

  return (
    <div style={background}>
      <Router>
        <Header title="TodoList" searchBar={false} />
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

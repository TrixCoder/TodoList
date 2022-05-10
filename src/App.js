import './styles.js';
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
import Styles from './styles';

function App() {
  let initTodo;
  let todoTheme="";
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  if (localStorage.getItem("todo_theme") === null) {
    todoTheme = "dark";
  }
  if(localStorage.getItem("todos") !== null){
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  if (localStorage.getItem("todo_theme") !== null) {
    todoTheme = JSON.parse(localStorage.getItem("todo_theme"));
  }

  const setTheme = (th) => {
    settheme(theme, th);
    setBackground(th === "light" ? Styles.bgImg : Styles.wgImg);
    if(th === "light"){
      setmyStyle(Styles.makeTextWhite);
    }else if(th === "dark"){
      setmyStyle(Styles.makeTextBlack);
    }
  };

  const onDelete = (todo) => { 
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
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

  const [theme, settheme] = useState(todoTheme);
  const [myStyle, setmyStyle] = useState(theme === "light" ? Styles.makeTextWhite:Styles.makeTextBlack);
  const [todos, setTodos] = useState(initTodo);

  const [background, setBackground] = useState(todoTheme === "light" ? Styles.bgImg : Styles.wgImg);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  useEffect(() => {
    localStorage.setItem("todo_theme", JSON.stringify(theme));
    setBackground(theme === "light" ? Styles.bgImg : Styles.wgImg);
  }, [theme]); 

  console.log(myStyle);
  return ( 
    <div style={background}> 
    <Router>
      <Header title="TodoList" searchBar={false} setTheme={setTheme} theme={theme}/> 
      <Switch>
          <Route exact path="/" render={()=>{
            return(
            <div>
            <AddTodo addTodo={addTodo} myStyle={myStyle} setmyStyle={setmyStyle}/>
            <Todos todos={todos} onDelete={onDelete} myStyle={myStyle} setmyStyle={setmyStyle}/> 
            </div>)
          }}> 
          </Route>
          <Route exact path="/about">
            <About myStyle={myStyle} setmyStyle={setmyStyle}/>
          </Route> 
        </Switch> 
      <Footer />
    </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import Styles from "./../styles";
import {TodoItem} from "./TodoItem";

export const Todos = (props) => {
    let ms = {
        minHeight: "70vh",
        margin: "40px auto"
    }
    let myStyle = props.myStyle;
    return (
        <div className="container" style={ms}>
            <h3 className="my-3" style={myStyle}>Todos List</h3>
            {props.todos.length===0? "No Todos to display":  
            props.todos.map((todo)=>{
                return (<TodoItem todo={todo} key={todo.sno} onDelete={props.onDelete} myStyle={myStyle}/>   
                )
            })
              } 
        </div>
    )
}

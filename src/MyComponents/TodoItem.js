import React, { useEffect, useState } from 'react';
import Styles from "./../styles";

export const TodoItem = ({todo, onDelete, myStyle}) => {
    return (
        <>
        <div style={myStyle}>
           <h4>{todo.title}</h4>
           <p>{todo.desc}</p>
           <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button> 
        </div>
        <hr/> 
        </>
    )
}

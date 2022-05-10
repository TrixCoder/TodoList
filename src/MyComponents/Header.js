import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import Styles from '../styles';

export default function Header(props) {

  const [myStyle, setmyStyle] = useState(props.theme === "dark" ? Styles.darkStyle:Styles.lightStyle);
  const [btntxt, setbtntxt] = useState(props.theme === "dark" ? "Light": "Dark");

  const changeTheme = () => {
    if (myStyle.navClass === "navbar navbar-expand-lg navbar-dark bg-dark") {
      setmyStyle(Styles.lightStyle);
      setbtntxt("Dark");
      props.setTheme("light");
      localStorage.setItem("todo_theme", JSON.stringify("light"));
    } else {
      setmyStyle(Styles.darkStyle);
      setbtntxt("Light");
      props.setTheme("dark");
      localStorage.setItem("todo_theme", JSON.stringify("dark"));
    } 
  }
  return (
    <nav className={myStyle.navClass}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          {props.searchBar ? <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> : ""}
          <button onClick={changeTheme} type="button" className={myStyle.changeThemeBtn}>{btntxt}</button>
        </div>
      </div>
    </nav>
  )
}
Header.defaultProps = {
  title: "DefaultTitle",
  searchBar: true
}

Header.propTypes = {
  title: PropTypes.string,
  searchBar: PropTypes.bool.isRequired
}
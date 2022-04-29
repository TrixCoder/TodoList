import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
const axios = require("axios");

export default function Header(props) {
  let darkStyle = {
    navClass: "navbar navbar-expand-lg navbar-dark bg-dark",
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

  const changeTheme = () => {
    let todoTheme = btntxt === "Light" ? "Dark" : "Light";
    if (todoTheme === "Dark") {
      setmyStyle({
        navClass: lightStyle.navClass,
        changeThemeBtn: lightStyle.changeThemeBtn
      })
      setbtntxt("Dark");
      axios.post("http://localhost:5000/theme", { settheme: "Light", style: { navClass: lightStyle.navClass, changeThemeBtn: lightStyle.changeThemeBtn } })
        .catch(err => console.log(err));
    } else {
      setmyStyle({
        navClass: darkStyle.navClass,
        changeThemeBtn: darkStyle.changeThemeBtn
      })
      setbtntxt("Light");
      axios.post("http://localhost:5000/theme", { settheme: "Dark", style: { navClass: darkStyle.navClass, changeThemeBtn: darkStyle.changeThemeBtn } })
        .catch(err => console.log(err));
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
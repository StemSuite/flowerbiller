import React from "react";
import { NavLink } from "react-router-dom"

function Nav() {
  return (
    <div>
      <h1>Stem Suite</h1>
      <nav>
        <ul id="nav_bar">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/standing_orders">Standing Orders</NavLink></li>
          <li><NavLink to="/special_orders">Special Orders</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav;

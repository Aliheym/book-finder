import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

function Header() {
  return (
    <div className="Header ui three item menu">
      <NavLink exact to="/" className="item" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/list" className="item" activeClassName="active">
        Reading list
      </NavLink>
      <NavLink to="/readed" className="item" activeClassName="active">
        Readed books
      </NavLink>
    </div>
  );
}

export default Header;

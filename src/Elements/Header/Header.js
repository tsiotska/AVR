import React from 'react';
import {Link} from "react-router-dom";

class Header extends React.Component {

  render = () =>
    <div className="nav-wrapper">
      <div className="nav-list">
        <div>

        </div>
          <Link to="/admin"> Admin Lite</Link>
        </div>
        <div>
          <Link to="/collection"> Collections</Link>
        </div>
        <div>
          <Link to="/news"> News </Link>
        </div>
        <div>
          <Link to="/popular"> Popular Searches </Link>
        </div>
      </div>
}

export default Header;

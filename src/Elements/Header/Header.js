import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";

class Header extends React.Component {
  logOut = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log("Ypu are logged out!");
      console.log(response);
      localStorage.removeItem("token");
      this.props.logOut(response.data.user, response.data.auth);
    })
  };

  render = () =>
    <div className="nav-wrapper">
      <div className="nav-list">

        <div className="route">
          <Link to="/" className="routeText"> Home </Link>
        </div>

        <div className="route">
          <Link to="/collections" className="routeText"> Collections</Link>
        </div>

        <div className="route">
          <Link to="/news" className="routeText"> News </Link>
        </div>

        {!this.props.auth ? <div className="logBtnGroup">

              <button className="SignIn" onClick={() => this.props.openModalWindow("isLogInOpened")}> Sign In</button>

              <button className="SignUp" onClick={() => this.props.openModalWindow("isSignUpOpened")}> Sign Up</button>

          </div>
          :
          <div>
            <button onClick={this.logOut}> Log Out</button>
          </div>
        }
      </div>
    </div>
}

const mapStateToProps = (state) => ({
  auth: state.reducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  openModalWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle})
  },
  logOut: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header)

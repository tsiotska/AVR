import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import ReactResizeDetector from 'react-resize-detector';
import MobileHeader from './MobileHeader';

class Header extends React.Component {
  state = {
    adaptateToMobile: false,
    leftSide: null,
    rightSide: null
  };

  onResize = () => {
    if (window.innerWidth >= 720) {
      this.setState({
        adaptateToMobile: false,
        leftSide: 354.5 + (window.innerWidth - 720) * 0.0055,
        rightSide: 10.5 - (window.innerWidth - 720) * 0.009
      });
      if(this.props.isSidebarOpened){
        this.props.openSidebar();
      }
      document.getElementById("leftSide").style.transform = " rotate(" + this.state.leftSide + "deg)";
      document.getElementById("rightSide").style.transform = " rotate(" + this.state.rightSide + "deg)";
    } else {
      this.setState({
        adaptateToMobile: true,
        rightSide: 14 - (window.innerWidth - 200) * 0.02
      });
      document.getElementById("rightSide").style.transform = " rotate(" + this.state.rightSide + "deg)";
    }
  };

  logOut = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log("You are logged out!");
      console.log(response);
      localStorage.removeItem("token");
      this.props.logOut(response.data.user, response.data.auth);
    })
  };

  activeButton = (event) => {
    this.props.setActivePage(event.target.id);
  };

  render() {
    return (

      <div className="nav-wrapper">

        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}/>

        <div className="nav-list">

          {!this.state.adaptateToMobile ?
            <div id="leftSide" className="blockOfRoutes">
              <div>
                <Link onClick={this.activeButton} id="home"
                      className={this.props.activePage === this.props.pages[0] ?
                        "activateButton " : "simpleButton"} to="/"> Home </Link>
              </div>

              <div>
                <Link onClick={this.activeButton} id="collections"
                      className={this.props.activePage === this.props.pages[1] ?
                        "activateButton " : "simpleButton"} to="/collections"> Collections</Link>
              </div>

              <div>
                <Link onClick={this.activeButton} id="news"
                      className={this.props.activePage === this.props.pages[2] ?
                        "activateButton " : "simpleButton"} to="/news"> News</Link>
              </div>
            </div>
            : <MobileHeader/>}

          {!this.props.auth ? <div id="rightSide" className="logBtnGroup">

              <div id="SignIn" className="SignIn" onClick={() => this.props.openModalWindow("isLogInOpened")}> Sign In
              </div>
              <div id="SignUp" className="SignUp" onClick={() => this.props.openModalWindow("isSignUpOpened")}> Sign Up
              </div>

            </div>
            :
            <div>
              <button onClick={this.logOut}> Log Out</button>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.reducer.auth,
  activePage: state.reducer.activePage,
  pages: state.reducer.pages,
  isSidebarOpened: state.reducer.isSidebarOpened,
});

const mapDispatchToProps = (dispatch) => ({
  openSidebar: () => {
    dispatch({type: "OPEN_SIDEBAR"})
  },
  setActivePage: (id) => {
    dispatch({type: "SET_ACTIVE_PAGE", id: id})
  },
  openModalWindow: (toggle) => {
    dispatch({type: "OPEN_MODAL_WINDOW", toggle: toggle})
  },
  logOut: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header)

import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from "axios";
import ReactResizeDetector from 'react-resize-detector';
import MobileHeader from './MobileHeader';

class Header extends React.Component {
  state = {
    adaptedToMobile: false,
    leftSide: null,
    rightSide: null
  };

  componentDidMount() {
    const path = window.location.pathname.split("/");
    console.log(path[1]);
    this.props.setActivePage(path[1]);
  }

  onResize = () => {
    if (window.innerWidth >= 720) {
      this.setState({
        adaptedToMobile: false,
        leftSide: 354.5 + (window.innerWidth - 720) * 0.0055,
        rightSide: 10.5 - (window.innerWidth - 720) * 0.009
      });
      if (this.props.isSidebarOpened) {
        this.props.openSidebar();
      }
      document.getElementById("leftSide").style.transform = " rotate(" + this.state.leftSide + "deg)";
    } else {
      this.setState({
        adaptedToMobile: true,
        rightSide: 10 - (window.innerWidth - 200) * 0.015
      });
    }

    document.getElementById("rightSide").style.transform = " rotate(" + this.state.rightSide + "deg)";
  };

  logOut = () => {
    axios.get("/api/users/logout").then((response) => {
      console.log("You are logged out!");
      console.log(response);
      localStorage.removeItem("token");
      this.props.logOut();
    }).catch((err) => console.log(err))
  };

  activeButton = (event) => {
    this.props.setActivePage(event.target.id);
  };

  render() {
    return (

      <div className="nav-wrapper">

        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}/>

        <div className="nav-list">

          {!this.state.adaptedToMobile ?
            <div id="leftSide" className="blockOfRoutes">
              <div>
                <Link onClick={this.activeButton} id=""
                      className={this.props.activePage === this.props.pages[0] || this.props.activePage === "cabinet" ?
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
                        "activateButton" : "simpleButton"} to="/news"> News</Link>
              </div>
            </div>
            : <MobileHeader/>}

          {!this.props.auth ?
            <div id="rightSide" className="logBtnGroup">

              <div id="SignIn" className="SignIn" onClick={() => this.props.openModalWindow("isLogInOpened")}> Sign In
              </div>
              <div id="SignUp" className="SignUp" onClick={() => this.props.openModalWindow("isSignUpOpened")}> Sign Up
              </div>

            </div>
            :
            <div id="rightSide" className="logBtnGroup">
              <div className="simpleButton"
                   onClick={this.logOut}> Log Out
              </div>
              <i className="fas fa-sliders-h fa-2x" onClick={() => this.props.toggleInfoWindow()}/>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  pages: state.reducer.pages,
  auth: state.reducer.auth,
  activePage: state.reducer.activePage,
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
  logOut: () => {
    dispatch({type: "LOG_OUT"})
  },
  toggleInfoWindow: () => {
    dispatch({type: "TOGGLE_USER_INFO"})
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header)

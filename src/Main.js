import React from 'react';
import * as THREE from 'three'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import axios from "axios";
import CollectionPage from "./Pages/Collections/CollectionPage"
import ModalWindow from "./Elements/ModalWindow/modalWindow"
import UserInfo from "./Pages/myCabinet/UserInfo";
import Header from './Elements/Header/Header';
import Home from './Pages/Home';
import Sidebar from './Elements/Header/Sidebar';
import PrivateRoute from './Elements/PrivateRoute/privateRoute';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.yourElement = React.createRef();
  }

  componentDidMount() {

    this.vantaEffect = VANTA.WAVES({
      el: this.yourElement.current,
      color: 0x153c09,
      THREE: THREE
    });

    let token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      axios.get("/api/users/profile", {headers: {'Authorization': token}})
        .then((response) => {
            console.log(response);
            if (response.data.auth) {
              localStorage.setItem("token", response.data.token);
              this.props.setUsersData(response.data.user, response.data.auth, response.data.token);
            }
          }
        ).catch((err) => console.log(err))
    }
  }


  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }

  render() {
    return (
      <div className="Wrapper">

        <div className="Background" ref={this.yourElement}/>

        <div className="Components">
          <Router>
            <Header/>
            <Sidebar/>

            {this.props.isModalOpened ?
              <ModalWindow/>
              : null}

            {this.props.isUserInfoOpened ?
              <UserInfo/>
              : null}

            <div className="Route">
              <Switch>
                <Route exact path="/">
                  {this.props.auth ? <Redirect to="/cabinet"/> : <Home/>}
                </Route>

                <Route exact path="/news">

                </Route>

                <Route exact path="/collections">
                  <CollectionPage/>
                </Route>

                <PrivateRoute exact path="/cabinet"/>
              </Switch>
            </div>

          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpened: state.reducer.isModalOpened,
  isSidebarOpened: state.reducer.isSidebarOpened,
  auth: state.reducer.auth,
  isUserInfoOpened: state.reducer.isUserInfoOpened
});

const mapDispatchToProps = (dispatch) => ({
  setUsersData: (data, auth, token) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth, token: token})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

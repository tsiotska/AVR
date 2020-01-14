import React from 'react';
import * as THREE from 'three'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import axios from "axios";
import CollectionPage from "./Pages/CollectionPage"
import ModalWindow from "./Elements/ModalWindow/modalWindow"
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
      color: 0x1234a4,
      THREE: THREE
    });

    let token = localStorage.getItem("token");

    if (token) {
      axios.get("/api/users/profile", {headers: {'Authorization': token}})
        .then((response) => {
            console.log(response);
            this.props.setUsersData(response.data.user, response.data.auth);
          }
        )
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
        <div className='Background' ref={this.yourElement}/>

        <div className="Components">
          <Router>
            <Header/>
            <Sidebar/>

            {this.props.isModalOpened ?
              <ModalWindow/>
              : null}


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
          </Router>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isModalOpened: state.reducer.isModalOpened,
  isSidebarOpened: state.reducer.isSidebarOpened,
  auth: state.reducer.auth
});

const mapDispatchToProps = (dispatch) => ({
  setUsersData: (data, auth) => {
    dispatch({type: "SET_USER_DATA", data: data, auth: auth})
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

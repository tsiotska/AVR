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
//import VANTA from 'vanta';

//import {Howl, Howler} from 'howler';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.Vanta = React.createRef();
    this.state = {playMusic: true}
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
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



    this.vantaEffect = VANTA.WAVES({
      el: this.Vanta.current,
      color: 0x153c09,
      THREE: THREE
    });
/*
    this.sound = new Howl({
      src: ['FonMusic.mp3'],
      autoplay: true,
      loop: true,
      volume: 1,
      onend: function () {
        console.log('Finished!');
      }
    });
    this.sound.play();*/
  }

  toggleMusic = () => {
    this.setState({playMusic: !this.state.playMusic});
    //this.sound.stop()
  };

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }

  render() {
    return (
      <div className="Wrapper">

        <div className="Background" ref={this.Vanta}/>

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
/*
            <div className="Audio">
              <div onClick={this.toggleMusic}>
                <i className={this.state.playMusic ? "fas fa-play" : "fas fa-pause"}/>
              </div>
            </div>
*/
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

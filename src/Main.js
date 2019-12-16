import React from 'react';
import * as THREE from 'three'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AdminPanel from "./Pages/AdminPanel";
import Header from './Elements/Header/Header';
import Home from './Pages/Home';
import Dropzone from './Elements/Dropzone/Dropzone';
import Login from './Pages/Authorization/login';
import SignUp from './Pages/Authorization/registration';
import Loading from './Loading/LoadingPage';
import PrivateRoute from './Elements/PrivateRoute/privateRoute';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.yourElement = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = VANTA.WAVES({
      el: this.yourElement.current,
      THREE: THREE
    })
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

            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>


              <Route exact path="/news">

              </Route>

              <Route exact path="/collection">

              </Route>

              <Route exact path="/login">
                <Login/>
              </Route>

              <Route exact path="/signup">
                <SignUp/>
              </Route>

              <PrivateRoute exact path="/cabinet" component={AdminPanel}>
                <Dropzone/>
              </PrivateRoute>

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;

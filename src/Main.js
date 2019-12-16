import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Elements/Header/Header';
import Home from './Pages/Home';
import Dropzone from './Elements/Dropzone/Dropzone';
import Loading from './Loading/LoadingPage';
import * as THREE from 'three'


class Main extends React.Component {
  constructor(props){
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
      <div className="Wrapper" >
        <div className='Background' ref={this.yourElement}/>

        <div className="Components">
          <Router>
            <Header/>

            <Switch>
              <Route path="/">
                <Home/>
              </Route>


              <Route path="/news">

              </Route>

              <Route path="/popular">

              </Route>

              <Route path="/cabinet">
                <Loading/>
                <Dropzone/>
              </Route>

            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;

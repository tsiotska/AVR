import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import axios from 'axios';
import Background from './Background/background';
import Header from '../src/Сomponents/Header/Header';
import ViewModel from './Сomponents/Model/Model';


class Main extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Components">
          <Router>
            <Header/>
            <Switch>

              <Route path="/">
                <ViewModel/>
              </Route>



              <Route path="/news">

              </Route>
              <Route path="/popular">

              </Route>
            </Switch>
          </Router>
        </div>

      </div>
    );
  }
}

/* <div className="Background">
          <Background/>
        </div>*/

export default Main;

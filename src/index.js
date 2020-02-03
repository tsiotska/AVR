import React from 'react';
import ReactDOM from 'react-dom';

import './Styles/Main.scss';

import Main from './Main';

import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(  <Provider store={store}><Main/></Provider>, document.getElementById('root'));

serviceWorker.unregister();

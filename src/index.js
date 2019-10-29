import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/Main.scss';
import Main from './Main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main/>, document.getElementById('root'));

serviceWorker.unregister();

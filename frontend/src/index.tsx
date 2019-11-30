import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Choosing from './Choosing';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Choosing />, document.getElementById('root'));

serviceWorker.unregister();

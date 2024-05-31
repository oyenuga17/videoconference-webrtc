import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as process from 'process';

window.global = window;
window.process = process;
window.Buffer = [];

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

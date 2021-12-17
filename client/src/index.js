import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router>        
        <App/>
    </Router>
,document.getElementById('root'));
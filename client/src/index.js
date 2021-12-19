import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import AppTest from './AppTest';
import 'antd/dist/antd.css';

ReactDOM.render(
    <Router>        
        <AppTest/>
    </Router>
,document.getElementById('root'));
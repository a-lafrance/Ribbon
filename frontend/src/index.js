import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, Results } from './App.js';
import reportWebVitals from './reportWebVitals';
import analyzeGroupchat from './analytics/analyzer.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useParams
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route path="/results/:id">
                <Results />
            </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

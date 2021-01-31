import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Results from './Results.js';
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
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
let root = document.getElementById('root');

if (root) {
  const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];

  if (path) {
    history.replace(path);
  }

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
    root
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

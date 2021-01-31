import React from 'react';
import StyledDropzone from './components/StyledDropzone.js'

import analyzeGroupchat from './analytics/analyzer.js'
import { getResult, saveResult } from './analytics/api.js'

import Tutorial from './components/Tutorial.js';
import Role from './components/Role.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import './App.css';
import './styles/PanelCard.css'
import GeneralStats from './components/GeneralStats.js';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        // Tracks the processed message_1.json results
        this.state = {
            resultID: -1
        }
    }

    // Process the raw .json file inputted in the dropzone
    processFileInput = (files) => {
        console.log(files);
        const file = files[0];
        const fr = new FileReader();
        fr.onload = (e) => {
            const content = JSON.parse(e.target.result);
            const result = analyzeGroupchat(content);

            saveResult(result).then(response =>
              response.json()
            ).then(data =>
              this.setState({ resultID: data.id })
            )
        }
        fr.readAsText(file);
    };

    render() {
        if (this.state.resultID > 0) {
          return <Redirect to={"results/" + this.state.resultID} />;
        }
        else {
          return (
            <Home onFileInput={this.processFileInput}/>
          );
        }
    }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayTutorial: false
    }
  }

  toggleTutorial = () => {
    this.setState({ displayTutorial: !this.state.displayTutorial });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1><span className="bolded">Ribbon</span></h1>
          <StyledDropzone onFileInput={this.props.onFileInput}/>
          <button onClick={this.toggleTutorial}>{this.state.displayTutorial ? 'Hide tutorial ↑' : 'Show tutorial ↓'}</button>
          {this.state.displayTutorial && <Tutorial />}
        </div>
      </div>
    );
  }

}

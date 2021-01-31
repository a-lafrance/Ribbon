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
    useParams
} from "react-router-dom";

import './App.css';
import './styles/PanelCard.css'
import GeneralStats from './components/GeneralStats.js';

export class App extends React.Component {

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
          <h1>Groupchat <span className="bolded">Wrapped</span></h1>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
          <StyledDropzone onFileInput={this.props.onFileInput}/>
          <button onClick={this.toggleTutorial}>{this.state.displayTutorial ? 'Hide' : 'Show'} tutorial</button>
          {this.state.displayTutorial && <Tutorial />}
        </div>
      </div>
    );
  }

}

export function Results(props) {
    let { id } = useParams();

    // let roles = props.results.roles;
    // console.log("raw roles",roles);
    // console.log(Object.values(roles));
    //
    // // Holds an array of the role components to display
    // let roleComponents = [];
    // for(var i in roles) roleComponents.push(<Role data={roles[i]} key={i}/>);

    return (
        <div>
            whats up ive been routed to results @ id = {id}
            {/* move the below code back up here */}
        </div>
    );

    // temporarily moved down here
    // <GeneralStats results={props.results}/>
    // {roleComponents}
}

export default App;

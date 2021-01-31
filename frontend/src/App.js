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
    }

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

function Home(props) {
    return (
        <div className="App">
            <header className="App-header">
                <h1> Messenger Wrapped</h1>
            </header>
            <StyledDropzone onFileInput={props.onFileInput}/>
            <Tutorial />
        </div>
    );
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

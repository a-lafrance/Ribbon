import React from 'react';
import StyledDropzone from './components/StyledDropzone.js'
import analyzeGroupchat from './analytics/analyzer.js'
import Tutorial from './components/Tutorial.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import './styles/PanelCard.css'
import GeneralStats from './components/GeneralStats.js';

class App extends React.Component {

    constructor(props) {
        super(props);
        // Tracks the processed message_1.json results
        this.state = {
            results: "",
        }
    }

    // Process the raw .json file inputted in the dropzone
    processFileInput = (files) => {
        console.log(files);
        const file = files[0];
        const fr = new FileReader();
        fr.onload = (e) => {
            const content = JSON.parse(e.target.result);
            //processContent(content)
            // Import Arthur's js processing and call it here
            console.log(content);
            const result = analyzeGroupchat(content);
            console.log(result);
            this.setState({ results: result });
        }
        fr.readAsText(file);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home onFileInput={this.processFileInput}/>
                    </Route>
                    <Route path="/results">
                        <Results results={this.state.results}/>
                    </Route>
                </Switch>
            </Router>
        );
    }

}

export default App;

function Home(props) {
    return (
        <div className="App">
          <div className="hero">
            <h1>Groupchat <span className="bolded">Wrapped</span></h1>
            <StyledDropzone onFileInput={props.onFileInput}/>
            <Tutorial />
          </div>
        </div>
    );
}

function Results(props) {
    return (
        <div>
            whats up ive been routed to results
            <GeneralStats results={props.results}/>
        </div>
    );
}

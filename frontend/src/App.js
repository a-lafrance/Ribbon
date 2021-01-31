import React from 'react';
import StyledDropzone from './components/StyledDropzone.js'
import analyzeGroupchat from './analytics/analyzer.js'
import Tutorial from './components/Tutorial.js';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
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
            const result = analyzeGroupchat(content);
            
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
                    <Route path="/results/:id">
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
            <header className="App-header">
                <h1> Messenger Wrapped</h1>
            </header>
            <StyledDropzone onFileInput={props.onFileInput}/>
            <Tutorial />
        </div>
    );
}

function Results(props) {
    let { id } = useParams();

    return (
        <div>
            whats up ive been routed to results @ id = {id}
            <GeneralStats results={props.results}/>
        </div>
    );
}

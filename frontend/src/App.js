import React, {useState} from 'react';
import StyledDropzone from './components/StyledDropzone.js'

import './App.css';
import './styles/PanelCard.css'

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
    fr.onload = function (e) {
      const content = JSON.parse(e.target.result);
      //processContent(content)
      // Import Arthur's js processing and call it here
      console.log(content);
      this.setState({results: content});
    }
    fr.readAsText(file);
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <h1> Messenger Wrapped</h1>
      </header>
      <StyledDropzone onFileInput={this.processFileInput}/>
      </div>
    );
  }

}

export default App;

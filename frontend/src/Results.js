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
import './styles/PanelCard.css';
import GeneralStats from './components/GeneralStats.js';

class Results extends React.Component {
    constructor(props) {
      super(props);

      let { id } = this.props.match.params;

      this.state = {
        id: id,
        result: {},
        roleComponents: []
      }
    }

    componentDidMount() {
      getResult(this.state.id).then(response => response.json()).then(data => {
        this.setState({result: data})
      })
      .then(res => {
          this.setState({roleComponents: this.genRoles()});
      });
    }

    genRoles() {
        let roles = this.state?.result.roles;
        console.log("raw roles",roles);
        console.log("objected", Object.entries(roles));
    
        // Holds an array of the role components to display
        let rComponents = [];
        Object.entries(roles).forEach((val, i) => {
            console.log(val);
            rComponents.push(<Role data={val} key={i}/>);
        });

        return rComponents;        
    }

    render() {
      return (
          <div>
              whats up ive been routed to results @ id = {this.state.id}
              {<GeneralStats results={this.state.result}/>}
              {this.state.roleComponents}
          </div>
      );
    }
    // let roles = props.results.roles;
    // console.log("raw roles",roles);
    // console.log(Object.values(roles));
    
    // // Holds an array of the role components to display
    // let roleComponents = [];
    // for(var i in roles) roleComponents.push(<Role data={roles[i]} key={i}/>);

}
export default withRouter(Results);

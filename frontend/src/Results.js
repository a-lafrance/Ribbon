import React from 'react';
import StyledDropzone from './components/StyledDropzone.js'

import analyzeGroupchat from './analytics/analyzer.js'
import { getResult, saveResult } from './analytics/api.js'

import GeneralStats from './components/GeneralStats.js';
import MemberStats from './components/MemberStats.js';
import ReactionStats from './components/ReactionStats.js';
import MessageStats from './components/MessageStats.js';
import ChatStats from './components/ChatStats.js';

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
import './styles/Results.css';
import './styles/PanelCard.css';


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
            //console.log(val);
            rComponents.push(<Role data={val} key={i}/>);
        });

        return rComponents;
    }

    render() {
      return (
          <div className='Results'>
            <div className='container'>
              <h1>{this.state.result.title}</h1>
              {<GeneralStats results={this.state.result}/>}
              {<MemberStats results={this.state.result}/>}
              <ReactionStats results={this.state.result}/>
              <MessageStats results={this.state.result} />
              <ChatStats results={this.state.result} />
              {this.state.roleComponents}
            </div>
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

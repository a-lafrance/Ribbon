import React from 'react';

import step1 from '../assets/step1_hl.jpg';
import step2 from '../assets/step2_hl.jpg';
import step3 from '../assets/step3_hl.jpg';
import step4 from '../assets/step4_hl.jpg';

import '../styles/Tutorial.css'

class Tutorial extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 1
    }
  }

  increment = (numSteps) => {
    this.setState({stepNumber: Math.min(numSteps, this.state.stepNumber + 1)});
  }

  decrement = () => {
    this.setState({stepNumber: Math.max(1, this.state.stepNumber - 1)});
  }

  render() {
    let steps = [
      <StepPanel description='"Deselect All" and then select "Messages"' image={step1} />,
      <StepPanel description='"Create File" with your preferred date and settings shown below' image={step2} />,
      <StepPanel description='Download the file when it is ready (this can take upwards of 20 minutes, depending on your date settings)' image={step3} />,
      <StepPanel description='Extract the file and find the json of the chat to analyze (facebook-name > messages > inbox > chatname > message_1.json)' image={step4} />
    ]

    return(
      <div className="tutorialPanel">
        <h3> How to Export Your Messenger Data</h3>
        <div className="buttons">
          <button onClick={this.decrement}>Previous</button>
          <button onClick={this.increment.bind(this, steps.length)}>Next</button>
        </div>
        {steps[this.state.stepNumber - 1]}
      </div>
    );
  }

}

function StepPanel(props) {
  return (
    <div className="stepPanelH">
      <div>{props.description}</div>
      <div><img className="stepImg" src={props.image}/></div>
    </div>
  )
}

export default Tutorial;

import step1 from '../assets/step1_hl.jpg';
import step2 from '../assets/step2_hl.jpg';
import step3 from '../assets/step3_hl.jpg';
import step4 from '../assets/step4_hl.jpg';

import '../styles/Tutorial.css'

let Tutorial = props => {

    return(
        <div className="tutorialPanel"> 
            <h1> How to Export Your Messenger Data</h1>
            <div className="stepPanelH">
                <span> Go to</span>
                <a href="https://www.facebook.com/dyi">https://www.facebook.com/dyi  </a>
            </div>
            <StepPanel description='"Deselect All" and then select "Messages"' image={step1} />
            <StepPanel description='"Create File" with your preferred date and settings shown below' image={step2} />
            <StepPanel description='Download the file when it is ready (this can take upwards of 20 minutes, depending on your date settings)' image={step3} />
            <StepPanel description='Extract the file and find the json of the chat to analyze (facebook-name > messages > inbox > chatname > message_1.json)' image={step4} />
        </div>
    );
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

// most & least freq contributors, convo times, etc 

let MemberStats = props => {

    let freqTimeStart;
    let freqTimeEnd;
    let mostReacted;
    let mostReactedStats;

    // sometimes the prop is null since the state is a little messed up
    if (Object.keys(props.results).length > 0) {
        freqTimeStart = props.results['mostFrequentTime'][0];
        freqTimeEnd = props.results['mostFrequentTime'][1];
        mostReacted = props.results['mostTotalReacts'][0];
        mostReactedStats = props.results['mostTotalReacts'][1]; 
    }

    return(
        <div className="panelCard"> 
            <div> Most frequent conversation time: {freqTimeStart} to {freqTimeEnd}  </div>
            <div> Most reacted: {mostReacted}, with {mostReactedStats} </div>
        </div>
    );
}

export default MemberStats;
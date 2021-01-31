// themes, common words, common phrases, uncommon

let ChatStats = props => {

    let firstCommonPhrase;
    let secondCommonPhrase;
    let thirdCommonPhrase;

    if (Object.keys(props.results).length > 0) { 
        firstCommonPhrase = props.results["wordCounts"][0][0];
        secondCommonPhrase = props.results["wordCounts"][1][0];
        thirdCommonPhrase = props.results["wordCounts"][2][0];
    }

    return(
        <div className="panelCard"> 
            <div> First most common phrase: {firstCommonPhrase} </div>
            <div> Second most common phrase: {secondCommonPhrase}</div>
            <div> Third most common phrase: {thirdCommonPhrase} </div>
        </div>
    );
}

export default ChatStats;
// total messages, avg words, longest streak, etc

let MessageStats = props => {

    let msgCount;
    let avgWordCount;
    let longestStreakStart;
    let longestStreakEnd;
    let firstMessage;

    if (Object.keys(props.results).length > 0) { 
        longestStreakStart = props.results['longestStreak'][0];
        longestStreakEnd = props.results['longestStreak'][1];
        firstMessage = props.results['firstMessage'];
    }

    return(
        <div className="panelCard"> 
            <div> Longest streak: {longestStreakStart} to {longestStreakEnd}</div>
            <div> First recorded message: {firstMessage}</div>
        </div>
    );
}

export default MessageStats;
// total messages, avg words, longest streak, etc

let MessageStats = props => {

    let msgCount;
    let avgWordCount;
    let longestStreakStart;
    let longestStreakEnd;
    let firstMessage;

    if (Object.keys(props.results).length > 0) {
        longestStreakStart = new Date(props.results['longestStreak'][0]);
        longestStreakStart = (longestStreakStart.getMonth() + 1) + "/" + longestStreakStart.getDay() + "/" + longestStreakStart.getFullYear();
        longestStreakEnd = new Date(props.results['longestStreak'][1]);
        longestStreakEnd = (longestStreakEnd.getMonth() + 1) + "/" + longestStreakEnd.getDay() + "/" + longestStreakEnd.getFullYear();
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

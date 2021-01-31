// word count, msg count
import '../styles/GeneralStats.css';

let GeneralStats = props => {

    // General Stats

    let chatName;
    let longestStreak = '';
    let reactCount = '';
    let msgCount = '';
    let title = '';

    console.log(props.results)

    if (Object.keys(props.results).length > 0) {
      longestStreak = Math.round(Math.abs(props.results.longestStreak[0] - props.results.longestStreak[1]) / (24 * 60 * 60 * 1000));
      reactCount = props.results.totalReacts;
      msgCount = props.results.totalMessages;
      title = props.results.title;
    }


    // Message Stats
    let longestStreakStart;
    let longestStreakEnd;

    if (Object.keys(props.results).length > 0) {
        longestStreakStart = new Date(props.results['longestStreak'][0]);
        longestStreakStart = (longestStreakStart.getMonth() + 1) + "/" + longestStreakStart.getDay() + "/" + longestStreakStart.getFullYear();
        longestStreakEnd = new Date(props.results['longestStreak'][1]);
        longestStreakEnd = (longestStreakEnd.getMonth() + 1) + "/" + longestStreakEnd.getDay() + "/" + longestStreakEnd.getFullYear();
    }


    // Member Stats
    let freqTimeStart;
    let freqTimeEnd;

    // sometimes the prop is null since the state is a little messed up
    if (Object.keys(props.results).length > 0) {
        freqTimeStart = props.results['mostFrequentTime'][0];
        freqTimeEnd = props.results['mostFrequentTime'][1];
    }

    return(
      <div className="genStatCard">
        <div>
          <div className="number"> {msgCount} </div>
          <div>Total Messages Sent</div>
        </div>
        <div class="emphasized">
          <div className="number"> {reactCount} </div>
          <div>Total Reacts Given</div>
        </div>
        <div>
          <div className="number"> {longestStreakStart}-{longestStreakEnd} </div>
          <div>Longest Streak</div>
        </div>
        <div class="emphasized">
          <div className="number"> {freqTimeStart}:00-{freqTimeStart + 1}:00 </div>
          <div>Most Frequent Conversation Time</div>
        </div>
      </div>
    );
}

export default GeneralStats;

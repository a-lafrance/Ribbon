// word count, msg count
import '../styles/GeneralStats.css';

let GeneralStats = props => {

    let chatName;
    let longestStreak = '';
    let msgCount = '';
    let title = '';

    console.log(props.results)

    if (Object.keys(props.results).length > 0) {
      longestStreak = Math.round(Math.abs(props.results.longestStreak[0] - props.results.longestStreak[1]) / (24 * 60 * 60 * 1000));
      msgCount = props.results.mostFrequentTime[1];
      title = props.results.title;
    }


    return(
        <div className="panelCard genStatCard">
            <div className="genStatTitle">Chat Title,</div>
            <div className="genStatTitle">Summarized</div>
            <div className="genStatCardInner">
                <div>
                    <div> Total Messages Sent </div>
                    <div className="number"> {msgCount} </div>
                </div>
                <div>
                    <div> Longest Streak </div>
                    <div className="number"> {longestStreak} </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralStats;

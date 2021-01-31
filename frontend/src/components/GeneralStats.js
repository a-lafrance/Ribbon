// word count, msg count
import '../styles/GeneralStats.css';

let GeneralStats = props => {

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


    return(
        <div className="panelCard genStatCard">
            <div className="genStatTitle">{title},</div>
            <div className="genStatTitle">Summarized</div>
            <div className="genStatCardInner">
                <div>
                    <div>Total Messages Sent</div>
                    <div className="number"> {msgCount} </div>
                </div>
                <div>
                    <div>Total Reacts Given</div>
                    <div className="number"> {reactCount} </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralStats;

// word count, msg count
import '../styles/GeneralStats.css';

let GeneralStats = props => {

    let chatName;
    let wordCount = '';
    let msgCount = '';

    if (Object.keys(props.results).length > 0) {
      wordCount = '' + props.results.mostTotalReacts[0] + ': ' + props.results.mostTotalReacts[1];
      msgCount = '' + props.results.mostFrequentTime[0] + ': ' + props.results.mostFrequentTime[1];
    }


    return(
        <div className="panelCard genStatCard">
            <div className="genStatTitle">{},</div>
            <div className="genStatTitle">Summarized</div>
            <div className="genStatCardInner">
                <div>
                    <div> Total Messages Sent </div>
                    <div> {msgCount} </div>
                </div>
                <div>
                    <div> Total Word Count </div>
                    <div> {wordCount} </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralStats;

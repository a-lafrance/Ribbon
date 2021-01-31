// word count, msg count
import '../styles/GeneralStats.css';

let GeneralStats = props => {

    let chatName;
    let wordCount;
    let msgCount;

    return(
        <div className="panelCard genStatCard"> 
            <div className="genStatTitle"> General Stats </div>
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
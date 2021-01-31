//reaction count, histogram

let ReactionStats = props => {

    let totalReacts;
    let reactionArray;

    if (Object.keys(props.results).length > 0) {
        totalReacts = props.results['totalReacts'];
        reactionArray = props.results['reactCounts'];
    }

    return(
        <div className="panelCard"> 
            <div> Total reacts: {totalReacts} </div>
            <div> Distribution: </div>
        </div>
    );
}

export default ReactionStats;
// General role display

let Role = props => {

    // Title name, icon path, description, stat unit
    const roleDict = {
        'The Word Wizard':          ['../role_icons/wizard1.svg', 'fun desc', '% of total words'],
        'The Alphabet Apprentice':  ['../role_icons/wizard2.svg', 'fun desc', '% of total words'],
        'The Stone':                ['../role_icons/stone1.svg', 'fun desc', '% of total messages sent'],
        'The Pebble':               ['../role_icons/stone2.svg', 'fun desc', '% of total messages sent'],
        'The Photographer':         ['../role_icons/photo1.svg', 'fun desc', '% of total photos sent'],
        'The Amateur Photographer': ['../role_icons/photo2.svg', 'fun desc', '% of total photos sent'],
        'The Reactor':              ['../role_icons/reactor1.svg', 'fun desc', '% of total reacts given'],
        'The Encourager':           ['../role_icons/reactor2.svg', 'fun desc', '% of total reacts given'],
        'The English Teacher':      ['../role_icons/english1.svg', 'fun desc', '% of total number of commas and semicolons'],
        'The English TA':           ['../role_icons/english2.svg', 'fun desc', '% of total number of commas and semicolons'],
        'The Sailor':               ['../role_icons/sailor1.svg', 'fun desc', '% of total swear words'],
        'The First Mate':           ['../role_icons/sailor2.svg', 'fun desc', '% of total swear words'],
        'The Emoji Spammer':        ['../role_icons/emoji1.svg', 'fun desc', '% of total emojis sent'],
        'The Emoji Poweruser':      ['../role_icons/emoji2.svg', 'fun desc', '% of total emojis sent'],
        'The Name Author':          ['../role_icons/name1.svg', 'fun desc', '% of total nickname changes'],
        'The Name Editor':          ['../role_icons/name2.svg', 'fun desc', '% of total nickname changes'],
    }

    // Parse relevant data from the prop
    let roleIcon = roleDict[props.data[0]][0];
    let roleTitle;
    let rolePersonName;
    let roleStat;

    return(
        <div className="panelCard"> 
            <svg src={roleIcon}/>
            <div> {roleTitle} </div>
            <div> {rolePersonName} </div>
            <div> {roleStat} </div>
        </div>
    );
}

export default Role;
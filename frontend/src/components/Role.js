// General role display

let Role = props => {

    // Title name, icon path, description, stat unit
    const roleDict = {
        'The Word Wizard':          ['../role_icons/wizard1.svg', 'This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot.', '% of total words'],
        'The Alphabet Apprentice':  ['../role_icons/wizard2.svg', 'This guy talks a lot, but not as much as the other guy.', '% of total words'],
        'The Stone':                ['../role_icons/stone1.svg', 'Maybe everyone else just talks too much.', '% of total messages sent'],
        'The Pebble':               ['../role_icons/stone2.svg', 'A chip off the old block.', '% of total messages sent'],
        'The Photographer':         ['../role_icons/photo1.svg', 'Is a picture of a plate of chicken alfredo worth 1000 words? Has anyone tried to write 1000 words about chicken alfredo?', '% of total photos sent'],
        'The Amateur Photographer': ['../role_icons/photo2.svg', 'Does a phone really count as a camera?', '% of total photos sent'],
        'The Reactor':              ['../role_icons/reactor1.svg', 'Definitely reflective of their true personality. I mean, just look at them.', '% of total reacts given'],
        'The Encourager':           ['../role_icons/reactor2.svg', 'Everyone just needs a little encouragement. Thanks.', '% of total reacts given'],
        'The English Teacher':      ['../role_icons/english1.svg', 'Only sliiightly pretentious. I swear. Please.', '% of total number of commas and semicolons'],
        'The English TA':           ['../role_icons/english2.svg', 'What do you think they had to do to get here? Wait, dont answer that.', '% of total number of commas and semicolons'],
        'The Sailor':               ['../role_icons/sailor1.svg', 'F--- f--- f--- f--- sh-- f--- sh-- b---- f--- -----------------', '% of total swear words'],
        'The First Mate':           ['../role_icons/sailor2.svg', 'Potty mouth in training. Mouth is probably full of shit right now.', '% of total swear words'],
        'The Emoji Spammer':        ['../role_icons/emoji1.svg', '😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂', '% of total emojis sent'],
        'The Emoji Poweruser':      ['../role_icons/emoji2.svg', '😳😳😳😳👇🏻👆🏻😳👆🏻👆🏻', '% of total emojis sent'],
        'The Name Author':          ['../role_icons/name1.svg', 'Some crimes go unpunished. Also known as', '% of total nickname changes'],
        'The Name Editor':          ['../role_icons/name2.svg', 'Only dabbles a bit in the dark art of text manipulation.', '% of total nickname changes'],
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
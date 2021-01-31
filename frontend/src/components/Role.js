import '../styles/Role.css';

// General role display

let Role = props => {

    // Title name, icon path, description, stat unit
    const roleDict = {
        'The Word Wizard': ['🧙', 'This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot.', '% of total words'],
        'The Alphabet Apprentice': ['🧙', 'This guy talks a lot, but not as much as the other guy.', '% of total words'],
        'The Stone': ['🪨', 'Maybe everyone else just talks too much.', '% of total messages sent'],
        'The Pebble': ['🪨', 'A chip off the old block.', '% of total messages sent'],
        'The Photographer': ['📸', 'Is a picture of a plate of chicken alfredo worth 1000 words? Has anyone tried to write 1000 words about chicken alfredo?', '% of total photos sent'],
        'The Amateur Photographer': ['📷', 'Does a phone really count as a camera?', '% of total photos sent'],
        'The Reactor': ['⚡️', 'Definitely reflective of their true personality. I mean, just look at them.', '% of total reacts given'],
        'The Encourager': ['💡', 'Everyone just needs a little encouragement. Thanks.', '% of total reacts given'],
        'The English Teacher': ['\0x1F9D1', 'Only sliiightly pretentious. I swear. Please.', '% of total number of commas and semicolons'],
        'The English TA': ['📖', 'What do you think they had to do to get here? Wait, dont answer that.', '% of total number of commas and semicolons'],
        'The Sailor': ['⛵️', 'F--- f--- f--- f--- sh-- f--- sh-- b---- f--- -----------------', '% of total swear words'],
        'The First Mate': ['⛵️', 'Potty mouth in training. Mouth is probably full of shit right now.', '% of total swear words'],
        'The Emoji Spammer': ['😂', '😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂', '% of total emojis sent'],
        'The Emoji Poweruser': ['😆', '😳😳😳😳👇🏻👆🏻😳👆🏻👆🏻', '% of total emojis sent'],
        'The Name Author': ['🖋', 'Some crimes go unpunished. Also known as:', '% of total nickname changes'],
        'The Name Editor': ['✏️', 'Only dabbles a bit in the dark art of text manipulation.', '% of total nickname changes'],
    }

    // Parse relevant data from the prop
    let roleIcon = roleDict[props.data[1][0]][0];
    let roleTitle = props.data[1][0];
    let roleDesc = roleDict[props.data[1][0]][1];
    let rolePersonName = props.data[0];
    let roleStat = (props.data[1][1]*100).toPrecision(3) + roleDict[props.data[1][0]][2];

    return (
      <div className="panelCard roleCard">
        <div className="roleInfo">
          <h2>{roleIcon} {roleTitle}</h2>
          <div> {roleDesc} </div>
        </div>
        <div className="roleRecipient">
          <h3> {rolePersonName} </h3>
          <div> {roleStat} </div>
        </div>
      </div>
    );
}

export default Role;

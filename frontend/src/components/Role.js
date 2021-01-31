
import wizard1 from '../assets/role_icons/wizard1.svg';
import wizard2 from '../assets/role_icons/wizard2.svg';
import stone1 from '../assets/role_icons/stone1.svg';
import stone2 from '../assets/role_icons/stone2.svg';
import photo1 from '../assets/role_icons/photo1.svg';
import photo2 from '../assets/role_icons/photo2.svg';
import reactor1 from '../assets/role_icons/reactor1.svg';
import reactor2 from '../assets/role_icons/reactor2.svg';
import english1 from '../assets/role_icons/english1.svg';
import english2 from '../assets/role_icons/english2.svg';
import sailor1 from '../assets/role_icons/sailor1.svg';
import sailor2 from '../assets/role_icons/sailor2.svg';
import emoji1 from '../assets/role_icons/emoji1.svg';
import emoji2 from '../assets/role_icons/emoji2.svg';
import name1 from '../assets/role_icons/name1.svg';
import name2 from '../assets/role_icons/name2.svg';

import '../styles/Role.css';

// General role display

let Role = props => {

    // Title name, icon path, description, stat unit
    const roleDict = {
        'The Word Wizard': [wizard1, 'This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot. This guy sure talks a lot.', '% of total words'],
        'The Alphabet Apprentice': [wizard2, 'This guy talks a lot, but not as much as the other guy.', '% of total words'],
        'The Stone': [stone1, 'Maybe everyone else just talks too much.', '% of total messages sent'],
        'The Pebble': [stone2, 'A chip off the old block.', '% of total messages sent'],
        'The Photographer': [photo1, 'Is a picture of a plate of chicken alfredo worth 1000 words? Has anyone tried to write 1000 words about chicken alfredo?', '% of total photos sent'],
        'The Amateur Photographer': [photo2, 'Does a phone really count as a camera?', '% of total photos sent'],
        'The Reactor': [reactor1, 'Definitely reflective of their true personality. I mean, just look at them.', '% of total reacts given'],
        'The Encourager': [reactor2, 'Everyone just needs a little encouragement. Thanks.', '% of total reacts given'],
        'The English Teacher': [english1, 'Only sliiightly pretentious. I swear. Please.', '% of total number of commas and semicolons'],
        'The English TA': [english2, 'What do you think they had to do to get here? Wait, dont answer that.', '% of total number of commas and semicolons'],
        'The Sailor': [sailor1, 'F--- f--- f--- f--- sh-- f--- sh-- b---- f--- -----------------', '% of total swear words'],
        'The First Mate': [sailor2, 'Potty mouth in training. Mouth is probably full of shit right now.', '% of total swear words'],
        'The Emoji Spammer': [emoji1, '😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂', '% of total emojis sent'],
        'The Emoji Poweruser': [emoji2, '😳😳😳😳👇🏻👆🏻😳👆🏻👆🏻', '% of total emojis sent'],
        'The Name Author': [name1, 'Some crimes go unpunished. Also known as', '% of total nickname changes'],
        'The Name Editor': [name2, 'Only dabbles a bit in the dark art of text manipulation.', '% of total nickname changes'],
    }

    // Parse relevant data from the prop
    let roleIcon = roleDict['The Alphabet Apprentice'][0];
    let roleTitle = 'The Alphabet Apprentice';
    let rolePersonName = 'insert name';
    let roleStat = 22 + roleDict['The Alphabet Apprentice'][2];

    return (
        <div className="panelCard roleCard">
            <div className="roleTitle"> {roleTitle} </div>
            <div className="roleCardInner">
                <div>
                    <img className="roleIcon" src={roleIcon} />
                </div>
                <div>
                    <div> {rolePersonName} </div>
                    <div> {roleStat} </div>
                </div>
            </div>
        </div>
    );
}

export default Role;
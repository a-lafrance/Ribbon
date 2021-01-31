import { areConsecutive, streakLength, streakDayLength, OneToOneDict, numEmojis, decodeUtf8 } from './utils.js';

/*

  How to use this code:

  To find the Groupchat Wrapped results for a group chat, call analyzeGroupchat(), passing in
  the JSON content read from the `message_1.json` file that the user uploads. The result that's returned
  will contain all results for the Groupchat Wrapped (see the dictionary on lines 124-131 for full documentation).

 */


export default function analyzeGroupchat(content) {
  let members = content.participants.map(participant => participant.name);
  let roleAssigner = new RoleAssigner(members);

  let messagesByTime = {};

  for (var i = 0; i < 24; i++) {
    messagesByTime[i] = 0; // messagesByTime maps {range start : msg count}
  }

  let totalReactsByMember = {};
  let totalMessages = 0;
  let totalMessagesByMember = {};

  for (const member of members) {
    totalReactsByMember[member] = 0;
    totalMessagesByMember[member] = 0;
  }

  let reactCounts = {};
  let wordCounts = {};
  const TOO_COMMON_WORDS = new Set([
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but', 'his', 'by',
    'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 'if', 'about', 'who',
    'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
    'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'was', 'which', 'why', 'yeah', 'too', 'my', 'like',
    'lol', 'lolol', 'lmao', 'yeah', 'sure', 'aight', 'alright', 'ok', 'btw', 'sup', 'okay', 'uh', 'um', 'uhh', 'hey', 'hi', 'yo', 'oh', 'ooh', 'nice', 'wait', 'oooh',
    'cool', 'thats', 'true', 'ahh'
  ])
  let longestStreak = [];
  let firstMessage = '';

  let streakStartMillis = null;
  let streakEndMillis = null;
  let longestStreakLength = -1;
  let longestStreakStartMillis = null;
  let longestStreakEndMillis = null;

  let validMembers = new Set();
  members.forEach(member => validMembers.add(member));

  for (const message of content.messages) {
    // check time, fit to range, increment range count
    let sender = message["sender_name"];

    if (validMembers.has(sender)) {
      // if valid, increment total messages
      totalMessages++;
      totalMessagesByMember[sender]++;

      // get time stuff
      let currMillis = message["timestamp_ms"];
      let date = new Date(currMillis);
      let time = date.getHours();

      messagesByTime[time]++;

      // if has reacts:
      if ("reactions" in message) {
        let n_reacts = message.reactions.length;

        // increment members' react counts
        totalReactsByMember[sender] += n_reacts;

        // increment react counts
        for (const react of message.reactions) {
          let icon = decodeUtf8(react.reaction);

          if (icon in reactCounts) {
            reactCounts[icon]++;
          }
          else {
            reactCounts[icon] = 1;
          }
        }
      }

      // increment current streak
      // if current streak dne or it's not broken, extend it
      if (areConsecutive(streakStartMillis, currMillis)) {
        streakStartMillis = currMillis; // set start cuz it goes backwards
      } else {
        streakStartMillis = currMillis;
        streakEndMillis = currMillis;
      }

      if (streakLength(streakStartMillis, streakEndMillis) > longestStreakLength) {
        longestStreakStartMillis = streakStartMillis;
        longestStreakEndMillis = streakEndMillis;
        longestStreakLength = streakLength(streakStartMillis, streakEndMillis);
      }

      // stuff to do with content
      if ("content" in message) {
        const content = message.content;
        // set firstMessage to message content
        firstMessage = content;

        if (!/sent an attachment/.test(content.toLowerCase()) && !/named the group/.test(content.toLowerCase())) {
          for (let phrase of (content.match(/(^|\s)([A-Za-z]+\s[A-Za-z]+\s[A-Za-z]+)($|\s)/g) || [])) {
            let croppedPhrase = phrase;

            if (croppedPhrase[0] == ' ') {
              croppedPhrase = croppedPhrase.substr(1, croppedPhrase.length);
            }

            if (croppedPhrase[croppedPhrase.length - 1] == ' ') {
              croppedPhrase = croppedPhrase.substr(0, croppedPhrase.length - 1);
            }

            const lowerPhrase = croppedPhrase.toLowerCase()
            let numCommonWords = 0;

            for (let word of lowerPhrase.split(' ')) {
              if (TOO_COMMON_WORDS.has(word)) {
                numCommonWords++;
              }
            }

            // only increment if it's not too common
            if (numCommonWords <= 1) {
              if (!(lowerPhrase in wordCounts)) {
                wordCounts[lowerPhrase] = 0;
              }

              wordCounts[lowerPhrase]++;
            }
          }
        }
      }

      roleAssigner.update(message);
    }
  }

  // find most frequent time, most total reacts
  let mostFrequentTime = -1;
  let maxMessageCount = -1;

  for (const [time, messageCount] of Object.entries(messagesByTime)) {
    if (messageCount > maxMessageCount) {
      mostFrequentTime = time;
      maxMessageCount = messageCount;
    }
  }

  let mostTotalReacts = -1;
  let mostTotalReactedMember = '';

  for (const [member, reacts] of Object.entries(totalReactsByMember)) {
    if (reacts > mostTotalReacts) {
      mostTotalReacts = reacts;
      mostTotalReactedMember = member;
    }
  }

  // sort everything
  let sortedReactCounts = Object.keys(reactCounts).map(function(key) {
    return [key, reactCounts[key]];
  });
  sortedReactCounts.sort(function(x, y) {return y[1] - x[1]});
  sortedReactCounts = sortedReactCounts.slice(0, 10);

  let sortedWordCounts = Object.keys(wordCounts).map(function(key) {
    return [key, wordCounts[key]];
  });
  sortedWordCounts.sort(function(x, y) {return y[1] - x[1]});
  sortedWordCounts = sortedWordCounts.slice(0, 10);

  let sortedMessagesByMember = Object.keys(totalMessages).map(function(key) {
    return [key, totalMessages[key]];
  });
  sortedMessagesByMember.sort(function(x, y) {return y[1] - x[1]});
  sortedMessagesByMember = sortedMessagesByMember.slice(0, 10);

  return {
    title: content.title,
    mostFrequentTime: [mostFrequentTime, maxMessageCount],
    mostTotalReacts: [mostTotalReactedMember, mostTotalReacts],
    reactCounts: sortedReactCounts,
    wordCounts: sortedWordCounts,
    longestStreak: [longestStreakStartMillis, longestStreakEndMillis],
    firstMessage: firstMessage,
    totalMessages: totalMessages,
    totalMessagesByMember: sortedMessagesByMember,
    roles: roleAssigner.assignRoles()
  };
}

class RoleAssigner {
  constructor(members) {
    this.scorekeepers = [
      new TalkerScorekeeper(members),
      new LurkerScorekeeper(members),
      new PhotographerScorekeeper(members),
      new ReacterScorekeeper(members),
      new EnglishTeacherScorekeeper(members),
      new SailorScorekeeper(members),
      new EmojiScorekeeper(members),
      new NamerScorekeeper(members),
    ];
  }

  update(message) {
    this.scorekeepers.forEach(scorekeeper =>
      scorekeeper.update(message)
    );
  }

  getScores() {
    let scores = {};

    for (const scorekeeper of this.scorekeepers) {
      if (scorekeeper.valid()) {
        for (const [member, score] of Object.entries(scorekeeper.scores())) {
          if (!(member in scores)) {
              scores[member] = [];
          }

          scores[member].push(score);
        }
      } else {
        console.log('scorekeeper is not valid')
      }
    }

    return scores;
  }

  assignRoles() {
    let scores = this.getScores();
    let totals = {};

    for (const scorekeeper of this.scorekeepers) {
      const roleNames = scorekeeper.role()
      const canonicalRole = roleNames[0]
      totals[canonicalRole] = 1;
    }

    let roleAssignments = new OneToOneDict();
    let outputRolesData = new OneToOneDict();
    let n_unassigned = Object.keys(scores).length;

    while (n_unassigned > 0) {
      let [member, canonicalRole, displayRole, score, displayData] = this.findBestScore(scores, totals, roleAssignments);

      if (member != null) {
        roleAssignments.set(member, canonicalRole);
        outputRolesData.set(member, [displayRole, displayData])

        for (const [roleNames, score, displayData] in scores[member]) {
          const canonicalRole = roleNames[0]
          totals[canonicalRole] -= score;
        }
      }

      n_unassigned--;
    }

    return outputRolesData.getItems();
  }

  findBestScore(scores, totals, roleAssignments) {
    let bestScore = null;
    let winner = null;
    let winningCanonicalRole = null;
    let winningDisplayRole = null;
    let bestDisplayData = null;

    for (const [member, memberScores] of Object.entries(scores)) {
      // don't assign to members that already have a role
      if (!roleAssignments.hasKey(member)) {
        for (const [roleNames, score, displayData] of memberScores) {
          const canonicalRole = roleNames[0]

          // don't assign roles that have been assigned twice
          if (roleAssignments.valueCount(canonicalRole) < 2) {
            let normalizedScore = score / totals[canonicalRole];

            if (bestScore == null || normalizedScore > bestScore) {
              bestScore = normalizedScore;
              winner = member;
              winningCanonicalRole = canonicalRole;
              winningDisplayRole = roleNames[roleAssignments.valueCount(canonicalRole)];
              bestDisplayData = displayData;
            }
          }
        }
      }
    }

    return [winner, winningCanonicalRole, winningDisplayRole, totals[winningCanonicalRole] * bestScore, bestDisplayData]
  }
}

class TalkerScorekeeper {
  constructor(members) {
    this.wordsSent = {};

    for (const member of members) {
      this.wordsSent[member] = 0.0;
    }

    this.totalWords = 0.0;
  }

  update(message) {
    let member = message["sender_name"];

    if (member in this.wordsSent) {
      if ("content" in message) {
        let words = message.content.split(" ").length;

        this.wordsSent[member] += words;
        this.totalWords += words;
      }
    }
  }

  valid() {
    return true; // cuz it's based on messages, and if you don't even have messages then you have nothing
  }

  scores() {
    let scores = {};

    for (const [member, wordsSent] of Object.entries(this.wordsSent)) {
      if (wordsSent > 0) {
        const percent = wordsSent / this.totalWords;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Word Wizard', 'The Alphabet Apprentice'];
  }
}

class LurkerScorekeeper {
  constructor(members) {
    this.inverse = new TalkerScorekeeper(members);
  }

  update(message) {
    this.inverse.update(message);
  }

  valid() {
    return true; // cuz it's based on messages, and if you don't even have messages then you have nothing
  }

  scores() {
    let scores = this.inverse.scores();
    let totalScore = 0.0;

    for (const [role, score] of Object.entries(scores)) {
      score[0] = this.role();
      score[2] = score[1];
      score[1] = 1.0 - score[1];

      totalScore += score[1];
    }

    for (const score of Object.values(scores)) {
      score[1] /= totalScore;
    }

    return scores;
  }

  role() {
    return ['The Stone', 'The Pebble'];
  }
}

class PhotographerScorekeeper {
  constructor(members) {
    this.photosSent = {};

    for (const member of members) {
      this.photosSent[member] = 0.0;
    }

    this.totalPhotos = 0.0;
  }

  update(message) {
    let member = message["sender_name"];

    if (member in this.photosSent) {
      if ("photos" in message) {
        let photos = message.photos.length;

        this.photosSent[member] += photos;
        this.totalPhotos += photos;
      }
    }
  }

  valid() {
    return true; // cuz it's based on messages, and if you don't even have messages then you have nothing
  }

  scores() {
    let scores = {};

    for (const [member, photosSent] of Object.entries(this.photosSent)) {
      if (photosSent > 0) {
        const percent = photosSent / this.totalPhotos
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Photographer', 'The Amateur Photographer'];
  }
}

class ReacterScorekeeper {
  constructor(members) {
    this.reactsMade = {};

    for (const member of members) {
      this.reactsMade[member] = 0.0;
    }

    this.totalReacts = 0.0;
  }

  update(message) {
    if ("reactions" in message) {
      for (const react of message.reactions) {
        let member = react.actor;

        if (member in this.reactsMade) {
          this.reactsMade[member]++;
          this.totalReacts++;
        }
      }
    }
  }

  valid() {
    return this.totalReacts > 10;
  }

  scores() {
    let scores = {};

    for (const [member, reactsMade] of Object.entries(this.reactsMade)) {
      if (reactsMade > 0) {
        const percent = reactsMade / this.totalReacts;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Reactor', 'The Encourager'];
  }
}

class EnglishTeacherScorekeeper {
  COMMA_WEIGHT = 1;
  SEMICOLON_WEIGHT = 3;

  constructor(members) {
    this.punctuationScores = {};

    for (const member of members) {
      this.punctuationScores[member] = 0.0;
    }

    this.totalPunctuationScore = 0.0;
  }

  update(message) {
    let member = message["sender_name"];
    let scoreIncrement = 0.0;

    if (member in this.punctuationScores) {
      if ("content" in message) {
        const content = message["content"]
        const commaCount = (content.match(/[A-Za-z],\s/g) || []).length;
        const semicolonCount = (content.match(/[A-Za-z];\s/g) || []).length;
        // no period counts because all "CMO changed the nickname of Kevin Xu to CFO"

        scoreIncrement = this.COMMA_WEIGHT * commaCount + this.SEMICOLON_WEIGHT * semicolonCount;
        this.punctuationScores[member] += scoreIncrement;
        this.totalPunctuationScore += scoreIncrement;
      }
    }
  }

  // PAT DEBUG do valid with numMessages
  valid() {
    return this.totalPunctuationScore > 100;
  }

  scores() {
    let scores = {};

    for (const [member, punctuationScore] of Object.entries(this.punctuationScores)) {
      if (punctuationScore > 0) {
        const percent = punctuationScore / this.totalPunctuationScore;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The English Teacher', 'The English TA'];
  }
}

class SailorScorekeeper {
  SWEAR_WEIGHTS = {
    'shit': 1,
    'bitch': 1,
    '\bass\b': 1,
    'cunt': 1,
    'fuck': 1,
    'motherfuck': 1, // motherfuck contains fuck, so really it's 1 + 1 = 2
  };

  constructor(members) {
    this.swearScores = {};

    for (const member of members) {
      this.swearScores[member] = 0.0;
    }

    this.totalSwearScore = 0.0;
  }

  update(message) {
    let member = message["sender_name"];
    let scoreIncrement = 0.0;

    if (member in this.swearScores) {
      if ('content' in message) {
        const content = message['content']

        for (const word in this.SWEAR_WEIGHTS) {
          const regex = new RegExp(`${word}`, 'gi')
          const wordCount = (content.match(regex) || []).length;
          scoreIncrement += this.SWEAR_WEIGHTS[word] * wordCount;
        }

        this.swearScores[member] += scoreIncrement;
        this.totalSwearScore += scoreIncrement;
      }
    }
  }

  // PAT DEBUG do valid with numMessages
  valid() {
    return this.totalSwearScore > 10;
  }

  scores() {
    let scores = {};

    for (const [member, swearScore] of Object.entries(this.swearScores)) {
      if (swearScore > 0) {
        const percent = swearScore / this.totalSwearScore;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Sailor', 'The First Mate'];
  }
}

class EmojiScorekeeper {
  constructor(members) {
    this.emojiAmounts = {};

    for (const member of members) {
      this.emojiAmounts[member] = 0.0;
    }

    this.totalEmojiAmount = 0.0;
  }

  update(message) {
    let member = message["sender_name"];
    let amountIncrement = 0.0;

    if (member in this.emojiAmounts) {
      if ('content' in message) {
        const content = message['content'];
        amountIncrement = numEmojis(content);

        this.emojiAmounts[member] += amountIncrement;
        this.totalEmojiAmount += amountIncrement
      }
    }
  }

  // PAT DEBUG do valid with numMessages
  valid() {
    return this.totalEmojiAmount > 5;
  }

  scores() {
    let scores = {};

    for (const [member, emojiAmount] of Object.entries(this.emojiAmounts)) {
      if (emojiAmount > 0) {
        const percent = emojiAmount / this.totalEmojiAmount;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Emoji Spammer', 'The Emoji Poweruser'];
  }
}

class NamerScorekeeper {
  constructor(members) {
    this.nameAmounts = {};

    for (const member of members) {
      this.nameAmounts[member] = 0.0;
    }

    this.totalNameAmount = 0.0;
  }

  update(message) {
    let member = message["sender_name"];
    let amountIncrement = 0.0;

    if (member in this.nameAmounts) {
      if ('content' in message) {
        const content = message['content'];

        if (/set\sthe\snickname\sfor/.test(content)) {
          amountIncrement = 1.0;
        } else if (/set\syour\snickname\sto/.test(content)) {
          amountIncrement = 1.0;
        }

        this.nameAmounts[member] += amountIncrement;
        this.totalNameAmount += amountIncrement
      }
    }
  }

  valid() {
    return this.totalNameAmount > 3;
  }

  scores() {
    let scores = {};

    for (const [member, nameAmount] of Object.entries(this.nameAmounts)) {
      if (nameAmount > 0) {
        const percent = nameAmount / this.totalNameAmount;
        scores[member] = [this.role(), percent, percent];
      }
    }

    return scores;
  }

  role() {
    return ['The Name Author', 'The Name Editor'];
  }
}

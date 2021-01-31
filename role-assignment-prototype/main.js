
export default function analyzeGroupchat(content) {
  let members = content.participants.map(participant => participant.name);
  roleAssigner = new RoleAssigner(members);

  let messagesByTime = {};

  for (var i = 0; i < 24; i++) {
    messagesByTime[i] = 0; // messagesByTime maps {range start : msg count}
  }

  let totalReactsByMember = {};

  for (const member of members) {
    totalReactsByMember[member] = 0;
  }

  let totalMessages = 0;

  let reactCounts = {};
  let longestStreak = [];
  let firstMessage = '';

  let currentStreak = [];

  let validMembers = new Set();
  members.forEach(member => validMembers.add(member));

  for (const message of content.messages) {
    // check time, fit to range, increment range count
    let sender = message["sender_name"];

    if (validMembers.has(sender)) {
      let date = new Date(message["timestamp_ms"]);
      let time = date.getHours();

      messagesByTime[time]++;

      // if has reacts:
      if ("reactions" in message) {
        let n_reacts = message.reactions.length;

        // increment members' react counts
        totalReactsByMember[sender] += n_reacts;

        // increment react counts
        for (const react of message.reactions) {
          let icon = react.reaction;

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
      if (currentStreak.length == 0) {
        currentStreak.push(date);
      }
      else if (areConsecutive(currentStreak[currentStreak.length - 1], date)) {
        // extend
        if (currentStreak.length == 1) {
          currentStreak.push(date);
        }
        else {
          currentStreak[1] = date;
        }
      }
      else {
        // check longest
        if (longestStreak.length == 0 || streakLength(currentStreak) > streakLength(longestStreak)) {
          longestStreak = currentStreak;
        }

        // reset current streak (including today)
        currentStreak = [date];
      }

      // set firstMessage to message content
      if ("content" in message)
        firstMessage = message.content;

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

  return {
    mostFrequentTime: [mostFrequentTime, maxMessageCount],
    mostTotalReacts: [mostTotalReactedMember, mostTotalReacts],
    reactCounts: reactCounts,
    longestStreak: longestStreak,
    firstMessage: firstMessage,
    roles: roleAssigner.assignRoles()
  };
}

function areConsecutive(date1, date2) {
  let nextDate = new Date(date1.getDate() + 1);

  return date1.getDate() == date2.getDate() || nextDate.getDate() == date2.getDate();
}

function streakLength(streak) {
  let [start, end] = streak;
  return new Date(end - start);
}


class OneToOneDict {
  // A dict with keys and values that obey a 1-to-1 relationship

  constructor() {
    this.items = {};
    this.values = new Set();
  }

  get(key) {
    return this.items[key];
  }

  set(key, value) {
    let prev = this.items[key];
    this.values.delete(prev);

    this.items[key] = value;
    this.values.add(value);
  }

  hasKey(key) {
    return (key in this.items);
  }

  hasValue(value) {
    return this.values.has(value);
  }

  getItems() {
    return this.items;
  }
}

class RoleAssigner {
  constructor(members) {
    this.scorekeepers = [
      new BlabbermouthScorekeeper(members),
      new TalkerScorekeeper(members),
      new LurkerScorekeeper(members),
      new PhotographerScorekeeper(members),
      new ReacterScorekeeper(members)
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
      for (const [member, score] of Object.entries(scorekeeper.scores())) {
        if (!(member in scores)) {
            scores[member] = [];
        }

        scores[member].push(score);
      }
    }

    return scores;
  }

  assignRoles() {
    let scores = this.getScores();
    let totals = {};

    for (const scorekeeper of this.scorekeepers) {
      totals[scorekeeper.role()] = 1;
    }

    let roles = new OneToOneDict();
    let n_unassigned = Object.keys(scores).length;

    while (n_unassigned > 0) {
      let [member, role, score] = this.findBestScore(scores, totals, roles);

      if (member != null) {
        roles.set(member, role);

        for (const [role, score] in scores[member]) {
          totals[role] -= score;
        }
      }

      n_unassigned--;
    }

    return roles.getItems();
  }

  findBestScore(scores, totals, roles) {
    let bestScore = null;
    let winner = null;
    let winningRole = null;

    for (const [member, memberScores] of Object.entries(scores)) {
      // don't assign to members that already have a role
      if (!roles.hasKey(member)) {
        for (const [role, score] of memberScores) {

          // don't assign roles that have been assigned
          if (!roles.hasValue(role)) {
            let normalizedScore = score / totals[role];

            if (bestScore == null || normalizedScore > bestScore) {
              bestScore = normalizedScore;
              winner = member;
              winningRole = role;
            }
          }
        }
      }
    }

    return [winner, winningRole, totals[winningRole] * bestScore]
  }
}

class BlabbermouthScorekeeper {
  constructor(members) {
    this.messagesSent = {};

    for (const member of members) {
      this.messagesSent[member] = 0.0;
    }

    this.totalMessages = 0.0;
  }

  update(message) {
    let member = message["sender_name"];

    if (member in this.messagesSent) {
      this.messagesSent[member]++;
      this.totalMessages++;
    }
  }

  scores() {
    let scores = {};

    for (const [member, messagesSent] of Object.entries(this.messagesSent)) {
      if (messagesSent > 0) {
        scores[member] = [this.role(), messagesSent / this.totalMessages];
      }
    }

    return scores;
  }

  role() {
    return 'Blabbermouth';
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

  scores() {
    let scores = {};

    for (const [member, wordsSent] of Object.entries(this.wordsSent)) {
      if (wordsSent > 0) {
        scores[member] = [this.role(), wordsSent / this.totalWords];
      }
    }

    return scores;
  }

  role() {
    return 'Talker';
  }
}

class LurkerScorekeeper {
  constructor(members) {
    this.inverse = new TalkerScorekeeper(members);
  }

  update(message) {
    this.inverse.update(message);
  }

  scores() {
    let scores = this.inverse.scores();
    let totalScore = 0.0;

    for (const [member, score] of Object.entries(scores)) {
      score[0] = this.role();
      score[1] = 1.0 - score[1];

      totalScore += score[1];
    }

    for (const score of Object.values(scores)) {
      score[1] /= totalScore;
    }

    return scores;
  }

  role() {
    return 'Lurker';
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

  scores() {
    let scores = {};

    for (const [member, photosSent] of Object.entries(this.photosSent)) {
      if (photosSent > 0) {
        scores[member] = [this.role(), photosSent / this.totalPhotos];
      }
    }

    return scores;
  }

  role() {
    return 'Photographer';
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

  scores() {
    let scores = {};

    for (const [member, reactsMade] of Object.entries(this.reactsMade)) {
      if (reactsMade > 0) {
        scores[member] = [this.role(), reactsMade / this.totalReacts];
      }
    }

    return scores;
  }

  role() {
    return 'Reacter';
  }
}

function processContent(content) {
  console.log("calculating scores for chat named '" + content.title + "'");
  console.log(analyzeGroupchat(content));
}

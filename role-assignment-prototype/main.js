// role assignment class:
  // store dict of {member : [raw scorekeeper]}
  // update by accessing scores[member] and calling role.update() for each role
  // get final scores by mapping each raw scorekeeper to a final score using role.normalize()

// role class:
  // store internal scorekeeping
  // update however necessary
  // normalize however

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

  /*
  assign_roles(scores, totals):
  where scores = {person : [(role, score)]}
  and totals = {role : total score}, totals[role] = 1 initially for all roles

  roles = {}
  n_people = len(scores)
  n_assigned = 0

  # find the best overall match, ie the person who best "dominates" a role
  # repeat until no more people are unassigned
  while n_assigned < n_people:
    # find the person who best "dominates" a role
    person, role, score = find_best_score(scores, totals)

    # assign that role to that person
    roles[person] = role

    # subtract their score from the total for the role
    for role, score in scores[person]:
      totals[role] -= score

  return roles
  */
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
/*
find_best_score(scores, totals):
  # init to defaults
  best_score = -inf
  winner = nil
  winning_role = nil

  # for each (person, role) combination, find the one that produces the best normalized score
  for person in scores:
    for role, raw_score in scores[person]:
      # raw_score is the score relative to a 0...1 scale
      # normalized_score is raw_score normalized to remaining total score
      normalized_score = raw_score / totals[role]

      # if this is the best option, overwrite the previous best
      if normalized_score > best_score:
        best_score = normalized_score
        winner = person
        winning_role = role

  # return winner & associated values
  return winner, winning_role, totals[winning_role] * best_score
  */

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

  members = content.participants.map(participant => participant.name);
  console.log("members: " + members);

  let roleAssigner = new RoleAssigner(members);
  // var times = 1;
  //
  // for (const member of members) {
  //   for (var i = 0; i < times; i++) {
  //     roleAssigner.update(member);
  //   }
  //
  //   times += 1;
  // }

  // for each message in the json:
  for (const message of content.messages) {
    roleAssigner.update(message);
  }
    // update for sender

  console.log(roleAssigner.getScores());

  console.log('Final results:');
  console.log(roleAssigner.assignRoles());
  console.log('');
}

// tells you whether the given string contains at least one emoji (I feel like actually counting the # per message is unnecessary)
function contains_emoji(s) {
  return /\p{Extended_Pictographic}/u.test(decode_utf8(s))
}

// returns a string that will actually be printed as the emoji
function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

// role assignment class:
  // store dict of {member : [raw scorekeeper]}
  // update by accessing scores[member] and calling role.update() for each role
  // get final scores by mapping each raw scorekeeper to a final score using role.normalize()

// role class:
  // store internal scorekeeping
  // update however necessary
  // normalize however

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
        scores[member] = ['Blabbermouth', messagesSent / this.totalMessages];
      }
    }

    return scores;
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
        scores[member] = ['Talker', wordsSent / this.totalWords];
      }
    }

    return scores;
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
      score[0] = 'Lurker';
      score[1] = 1.0 - score[1];

      totalScore += score[1];
    }

    for (const score of Object.values(scores)) {
      score[1] /= totalScore;
    }

    return scores;
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
        scores[member] = ['Photographer', photosSent / this.totalPhotos];
      }
    }

    return scores;
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
        scores[member] = ['Reacter', reactsMade / this.totalReacts];
      }
    }

    return scores;
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

  console.log('');
}

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
    this.scores = {};

    for (const member of members) {
      this.scores[member] = [new BlabbermouthScorekeeper()];
    }

    this.totalMessages = 0.0;
  }

  update(message) {
    let member = message["sender_name"];

    if (member in this.scores) {
      for (var scorekeeper of this.scores[member]) {
        scorekeeper.update();
      }

      this.totalMessages++;
    }
  }

  getScores() {
    let scores = {};

    for (const [member, scorekeepers] of Object.entries(this.scores)) {
      scores[member] = scorekeepers.map(scorekeeper => scorekeeper.normalize(this.totalMessages));
    }

    return scores;
  }
}

class BlabbermouthScorekeeper {
  constructor() {
    this.messagesSent = 0.0;
  }

  update(message) {
    this.messagesSent++;
  }

  normalize(totalMessages) {
    return ['Blabbermouth', this.messagesSent / totalMessages];
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

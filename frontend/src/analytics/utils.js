export function areConsecutive(date1, date2) {
  let nextDate = new Date(date1.getDate() + 1);

  return date1.getDate() == date2.getDate() || nextDate.getDate() == date2.getDate();
}

export function streakLength(streak) {
  let [start, end] = streak;
  return new Date(end - start);
}


export class OneToOneDict {
  // A dict with keys and values that obey a 1-to-1 relationship

  constructor() {
    this.items = {};
    this.counts = {};
  }

  get(key) {
    return this.items[key];
  }

  set(key, value) {
    this.items[key] = value;

    if (!(value in this.counts)) {
      this.counts[value] = 0;
    }

    this.counts[value] += 1;
  }

  hasKey(key) {
    return (key in this.items);
  }

  valueCount(value) {
    if (value in this.counts) {
      return this.counts[value];
    } else {
      return 0;
    }
  }

  getItems() {
    return this.items;
  }
}

// tells you whether the given string contains at least one emoji (I feel like actually counting the # per message is unnecessary)
export function numEmojis(s) {
  const decoded_string = decodeUtf8(s)
  return (decoded_string.match(/\p{Extended_Pictographic}/gu) || []).length
}

// returns a string that will actually be printed as the emoji
export function decodeUtf8(s) {
  return decodeURIComponent(escape(s));
}

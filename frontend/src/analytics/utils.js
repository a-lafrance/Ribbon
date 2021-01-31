export function areConsecutive(millis1, millis2) {
  return Math.abs(millis1 - millis2) < 24 * 60 * 60 * 1000;
}

export function streakLength(start, end) {
  const length = Math.abs(end - start);
  return length;
}

export function streakDayLength(start, end) {
  return streakLength(start, end) / (24 * 60 * 60 * 1000);
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

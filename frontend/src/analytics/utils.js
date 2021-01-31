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

// tells you whether the given string contains at least one emoji (I feel like actually counting the # per message is unnecessary)
export function numEmojis(s) {
  const decoded_string = decodeUtf8(s)
  return (decoded_string.match(/\p{Extended_Pictographic}/gu) || []).length
}

// returns a string that will actually be printed as the emoji
export function decodeUtf8(s) {
  return decodeURIComponent(escape(s));
}

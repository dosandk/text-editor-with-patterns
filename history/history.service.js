export class Snapshot {
  #state = {};

  get state() {
    return this.#state;
  }

  constructor(text, version) {
    const isoDate = new Date().toISOString();
    const { time } = isoDate.match(/T(?<time>[^\.]+)\./).groups;

    this.#state = {
      text,
      date: time,
      version,
    };
  }
}

export class HistoryService {
  #list = [];
  maxSize = 5;
  version = 0;

  get list() {
    return this.#list;
  }

  add(text) {
    const snapshot = new Snapshot(text, this.version);

    this.version += 1;

    this.#list.unshift(snapshot);

    // NOTE: remove item from list end
    if (this.#list.length > this.maxSize) {
      this.#list.pop();
    }

    return snapshot;
  }
}

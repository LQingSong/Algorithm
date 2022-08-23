import { defaultToString } from "../Utils/index.mjs";

class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `{ #${this.key}: ${this.value} }`;
  }
}

class HashMap {
  constructor(toStringFn = defaultToString) {
    this.toStringFn = toStringFn;
    this.table = {};
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair !== null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair === null ? undefined : valuePair.value;
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  loseloseHashCode(key) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStringFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    return hash % 37;
  }
}

export { HashMap };

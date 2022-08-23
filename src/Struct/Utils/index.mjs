export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0,
};

export function defaultToString(obj) {
  if (obj === null) {
    return "NULL";
  } else if (obj === "undefined") {
    return "UNDEFINED";
  } else if (typeof obj === "string" || obj instanceof String) {
    return `${obj}`;
  }
  return obj.toString();
}

export function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[ # ${this.key}: ${this.value} ]`;
  }
}

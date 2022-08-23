import { defaultToString, ValuePair } from "../Utils/index.mjs";

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  set(key, value) {
    if (key !== null && value !== null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }

  hasKey(key) {
    return !!this.table[this.toStrFn(key)];
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair === null ? undefined : valuePair.value;
  }

  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  // 以数组的形式返回所有的键名
  keys() {
    return this.keyValues().map((item) => item.key);
  }

  // 将字典所包含的所有数值以数组的形式返回
  values() {
    return this.keyValues().map((item) => item.value);
  }

  keyValues() {
    return Object.values(this.table);
  }

  forEach(callBackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs; i++) {
      const result = callBackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1, len = valuePairs.length; i < len; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`;
    }

    return objString;
  }
}

export { Dictionary };

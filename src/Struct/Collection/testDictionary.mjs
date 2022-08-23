import { Dictionary } from "./Dictionary.mjs";

const dictionary = new Dictionary();

dictionary.set("a", 100);
dictionary.set("b", 200);

console.log(dictionary.hasKey("a"));
console.log(dictionary.keyValues());
console.log(dictionary.size());
console.log(dictionary.hasKey("c"));

import { HashMap } from "./HashMap.mjs";

const hashMap = new HashMap();
hashMap.put("a", "aaa.com");
hashMap.put("b", "bbb.com");
hashMap.put("a", "aaa2.com");
console.log(hashMap.get("a"));
console.log(hashMap.hashCode("a") + " - aaa.com");

import { computed } from 'vue'

export const withState = (target: any, state: any) => {
  Object.keys(state).forEach(prop => {
    target[prop] = computed(() => state[prop])
  })
  return target
}

export function nullifyObject(object: any) {
  const newObj = { ...object }
  Object.keys(object).forEach((key) => {
    newObj[key] = getValue(newObj[key]);
  });
  return newObj
}

function getValue(value: any) {
  if (Array.isArray(value)) {
    return [];
  };
  if (typeof value === "function" || typeof value === "undefined") {
    return value
  };
  if (typeof value === "bigint" || typeof value === "number") {
    console.log(value)
    return 0;
  };
  if (typeof value === "object") {
    return {};
  };
  if (typeof value === "string") {
    console.log("String: ", value)
    return ""
  };
}
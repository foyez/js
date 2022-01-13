# Objects Comparison

**1. Referential equality - compared values reference**

JavaScript provides 3 ways to compare values:

- The strict equality operator ===
- The loose equality operator ==
- Object.is() function

When comparing objects using any of the above, that is called referential equality.

```js
const lang1 = { name: "Javascript" };
const lang2 = { name: "Javascript" };

lang1 === lang1; // => true
lang1 === lang2; // => false

lang1 == lang1; // => true
lang1 == lang2; // => false

Object.is(lang1, lang1); // => true
Object.is(lang1, lang2); // => false
```

Referential equality is useful when you'd like to compare object references, rather than their content.

**2. Shallow equality - check the properties' values**

```js
function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
```

But objects in JavaScript can be nested. In such a case, unfortunately, the shallow equality doesn't work well.

**3. Deep equality**

> During the shallow check, if the compared properties are objects, a recursive shallow equality check is performed on these nested objects, is called deeply equality.

```js
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object) {
  return object != null && typeof object === "object";
}
```

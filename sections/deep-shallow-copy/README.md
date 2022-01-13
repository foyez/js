# Deep copy vs Shallow copy

- A deep copy means that all of the values of the new variable are copied and disconnected from the original variable.
- A shallow copy means that certain (sub-)values are still connected to the original variable.

```js
// In JS, objects are referenced by memory
const obj1 = { name: "Javascript" };

// Copying the memory referecne of `obj1`
// obj1 and obj2 point to the same memory reference
// actually this is a shallow copy
const obj2 = obj1;

obj2.name = "Golang";

console.log(obj1, obj2); // {name: 'Golang'} {name: 'Golang'}
```

```js
const obj1 = { name: "Javascript" };

// Copying the object's values
// this is a deep copy
const obj2 = { ...obj1 };
// const obj2 = Object.assign({}, obj1)
// const obj2 = JSON.parse(JSON.stringify(obj1))

obj2.name = "Golang";

console.log(obj1, obj2); // {name: 'Javascript'} {name: 'Golang'}
```

What about nested objects or array (array is also object in JS)?

```js
const obj1 = {
  level: 1,
  key1: {
    level: 2,
    key2: {
      level: 3,
      name: "Javascript",
    },
  },
};

// copies only the values of top level
// this is a shallow copy
const obj2 = { ...obj2 };

obj2.key1.key2.name = "Golang";

console.log(obj1 === obj2); // false
console.log(obj1.key1 === obj2.key1); // true
console.log(obj1.key1.key2.name, obj2.key1.key2.name); // 'Golang' 'Golang'
```

```js
const arr1 = [1, [2, [3]]];

// copies only the values of top level
// this is a shallow copy
const arr2 = [...arr1];
// const arr2 = Object.assign([], arr1)

arr2[0] = 78;
arr2[1][0] = 47;

console.log(arr1 === arr2); // false
console.log(arr1[0] === arr2[0]); // false
console.log(arr1[1] === arr2[1]); // true
console.log(arr1, arr2); // [1, [47, [3]]] [78, [47, [3]]]
```

```js
const obj1 = {
  level: 1,
  key1: {
    level: 2,
    key2: {
      level: 3,
      name: "Javascript",
    },
  },
};

// deep copy using spread operator
const spreadDeepCopy = {
  ...obj1,
  key1: {
    ...obj1.key1,
    key2: {
      ...obj2.key1.key2,
      name: "Golang",
    },
  },
};

// deep copy using JSON parse & stringify
// you can only use it when you copy objects with native JavaScript values
// you will not be able to copy custom class instances
// drawbacks, loose data structure dependencies, like, functions or circular dependencies
const jsonDeepCopy = JSON.parse(JSON.stringify(obj1));
```

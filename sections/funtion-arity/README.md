# Function Arity

```js
/**
 * arity = the number of arguments a function takes
 */
const log = console.log;
const functionArity = (func) => func.length;

function add(a, b = 1) {
  log("arguments: ", arguments.length); // 4

  const sum = a + b;
  console.log("sum: ", sum); // 3

  const argumentsSum = [...arguments].reduce((acc, val) => acc + val, 0);
  console.log("argumentsSum: ", argumentsSum); // 10
}

add(1, 2, 3, 4);
log("arity: ", functionArity(add)); // 1, since b has a default value
```

# Rest operator

`The syntax appears the same as spread (...) but has the opposite effect. Instead of unpacking an array or object into individual values, the rest syntax will create an array or object of an indefinite number of arguments.`

```js
const [firstTool, ...rest] =
  ["hammer", "screwdriver", "wrench"] >
  firstTool > // "hammer"
  rest; // ["screwdriver", "wrench"]

const { isLoggedIn, ...rest } =
  { id: 1, name: "Ben", isLoggedIn: true } >
  isLoggedIn > // true
  rest; // { id: 1, name: 'Ben' }
```

```js
function multiply(...numbers) {
  return numbers.reduce((acc, num) => acc * num, 1);
}

multiply(1, 2, 3); // 6
```

```js
function multiply(firstNum, ...numbers) {
  console.log(firstNum); // 2

  return numbers.reduce((acc, num) => acc * num, 1);
}

multiply(2, 3, 4); // 12
```

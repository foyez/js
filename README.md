# Javascript

## var, let, const and hoisting

<details>
<summary>View contents</summary>

### var, let & const

- `var` is a function scoped variable
- `let` and `const` are block scoped variable
- Duplicate declaration of variables, which is possible with `var`, will throw an error with `let` and `const`.
- `var` allows the possibility of `hoisting`, which is variable declarations being saved to memory. This allows for the unintended consequence of undefined variables in your code. The introduction of `let` and `const` resolves this issue, by throwing an error when attempting to use a variable before declaring it or attempting to declare a variable more than once.

| Keyword |	Scope |	Hoisting |	Can Be Reassigned |	Can Be Redeclared |
|---------|-------|----------|--------------------|-------------------|
| var |	Function scope |	Yes |	Yes |	Yes |
| let |	Block scope |	No |	Yes |	No |
| const |	Block scope |	No |	No |	No |

```js
// Initialize a global variable
var species = 'human'

function transform() {
  // Initialize a local, function-scoped variable
  var species = 'werewolf'
  console.log(species)
}

// Log the global and local variable
console.log(species) // human
transform() // werewolf
console.log(species) // human
```

```js
var fullMoon = true

// Initialize a global variable
let species = 'human'

if (fullMoon) {
  // Initialize a block scoped variable
  let species = 'werewolf'
  console.log(species) // werewolf
}

console.log(species) // human
```

```js
var fullMoon = true

// Initialize a global variable
var species = 'human'

if (fullMoon) {
  // Initialize a block scoped variable
  var species = 'werewolf'
  console.log(species) // werewolf
}

console.log(species) // werewolf
```

### hoisting

- In variable hoisting, only the variable declarations, and not the variable definition/assignment, is moved to the top of the scope chain.
- In function hoisting, both the function declaration as well as the definition is moved to the top of the scope chain.

```js
// Attempt to use a variable before declaring it
console.log(x) // undefined

// Variable assignment
var x = 100
```

The reason for this is due to hoisting, a JavaScript action in which __variable and function declarations are moved to the 
top of their scope__. Since only the actual declaration is hoisted, and not the initialization, the value in the first 
example returns undefined.

```js
// The code we wrote
console.log(x)
var x = 100

// How JavaScript interpreted it
var x
console.log(x)
x = 100
```

```js
// Initialize x in the global scope
var x = 100

function hoist() {
  // A condition that should not affect the outcome of the code
  if (false) {
    var x = 200
  }
  console.log(x) // undefined
}

hoist()
```

```js
// Initialize x in the global scope
let x = 100

function hoist() {
  // A condition that should not affect the outcome of the code
  if (false) {
    let x = 200
  }
  console.log(x) // 100
}

hoist()
```

</details>

## Nullish coalescing operator (`??`), optional chaining operator (`?.`), logical OR (`||`) and Falsy

<details>
<summary>View contents</summary>

```js
// Falsy - considered false when encountered in a Boolean context
// Falsy values - undefined, null, false, 0, -0, 0n, "", '', ``

// || - returns the right-hand operand if the left-hand is falsy
// leftExpr || rightExpr
0 || "other" // "other"

// ?? - similar to || but only returns the right-hand operand if the left-hand is null or undefined
// leftExpr ?? rightExpr
0 ?? "other" // 0
undefined ?? "other" // "other"

// ?. - like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined),
// it returns undefined
const obj = { lang: "js" };
obj.lang?.toUpperCase // "JS"
obj.framework?.toUpperCase // undefined
obj.notexistingFunc?.() // undefined
obj.arr?.[1] // undefined

// combine
null || undefined ?? "foo" // syntax error
(null || undefined) ?? "foo" // "foo"

const foo = { someFooProp: "hi" } 
foo.someFooProp?.toUpperCase() ?? "not available" // "HI"
foo.someBarProp?.toUpperCase() ?? "not available" // "not available"
```

</details>

## this, bind, call and apply

<details>
<summary>View contents</summary>
  
### `this`

#### 1. Global Context

```js
console.log(this) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
```

```js
function printThis() {
  console.log(this) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
}

printThis()
```

```js
'use strict'

function printThis() {
  console.log(this) // undefined
}

printThis()
```

#### An Object Method

```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`) // "The United States of America was founded in 1776."
  },
}

america.describe()
```

#### Nested object

```js
const america = {
  name: 'The United States of America',
  yearFounded: 1776,
  details: {
    symbol: 'eagle',
    currency: 'USD',
    printDetails() {
      console.log(
        `The symbol is the ${this.symbol} and the currency is ${this.currency}.`,
      ) // "The symbol is the eagle and the currency is USD."
    },
  },
}

america.details.printDetails()
```

### A Function Constructor

```js
function Country(name, yearFounded) {
  this.name = name
  this.yearFounded = yearFounded

  this.describe = function () {
    console.log(`${this.name} was founded in ${this.yearFounded}.`) // "The United States of America was founded in 1776."

  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```

#### A Class Constructor

```js
class Country {
  constructor(name, yearFounded) {
    this.name = name
    this.yearFounded = yearFounded
  }

  describe() {
    console.log(`${this.name} was founded in ${this.yearFounded}.`) // "The United States of America was founded in 1776."
  }
}

const america = new Country('The United States of America', 1776)

america.describe()
```

## call, apply & bind

- `call` and `apply` are very similar—they invoke a function with a specified `this` context, and optional arguments.
- `call` requires the arguments to be passed in one-by-one, and `apply` takes the arguments as an array.
- `call` and `apply` are used to invoke the `this` context of an object on the function.
- Sometimes, you might need to use a method over and over with the `this` context of another object, and in that case you could use the `bind` method to create a brand new function with an explicitly bound `this`.

```js
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary() {
  console.log(`${this.title} was written by ${this.author}.`)
}

summary() // "undefined was written by undefined"

// call and apply are used to invoke the this context of book on the function.
summary.call(book) // "Brave New World was written by Aldous Huxley."
summary.apply(book) // "Brave New World was written by Aldous Huxley."

// bind
const braveNewWorldSummary = summary.bind(book)
braveNewWorldSummary() // "Brave New World was written by Aldous Huxley."

function longerSummary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`,
  )
}

longerSummary.call(book, 'dystopian', 1932) // "Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
longerSummary.apply(book, ['dystopian', 1932]) // "Brave New World was written by Aldous Huxley. It is a dystopian novel written in 1932."
```
  
</details>

## Destructuring

<details>
<summary>View contents</summary>

`Destructuring is used to create varibles from array items or object properties.`

#### `Object Destructuring`
```js
const note = {
  id: 1,
  title: 'My first note',
  author: {
    firstName: 'Sherlock',
    lastName: 'Holmes',
  },
}

// Destructure properties into variables
const { id, title } = note

// Assign a custom name to a destructured value
const { id: noteId, title } = note

// Destructure nested properties
const {
  id,
  title,
  author: { firstName, lastName },
} = note

// Access object and nested values
const {
  author,
  author: { firstName, lastName },
} = note

// setting new variable with default value
const {title = 'foyez', date = new Date()} = note

// destructring on function parameter
const func = ({ id, title }) => `ID: ${id}, Title: ${title}`
func(note)
```

#### `Array Destructuring`

```js
const date = ['1970', '12', '01']
const nestedArray = [1, 2, [3, 4], 5]

// Destructure Array values into variables
const [year, month, day] = date

// Skip the second item in the array
const [year, , day] = date

// Destructure nested items
const [one, two, [three, four], five] = nestedArray
```

#### `Destructure the parameters in a function`

```js
const note = {
  id: 1,
  title: 'My first note',
  date: '01/01/1970',
}

// Using forEach
Object.entries(note).forEach(([key, value]) => {
  console.log(`${key}: ${value}`)
})

// Using a for loop
for (let [key, value] of Object.entries(note)) {
  console.log(`${key}: ${value}`)
}
```
  
</details>

## Spread Operator

<details>
<summary>View contents</summary>

`Spread syntax is used to unpack iterables such as arrays, objects, and function calls.`

#### `Spread with Arrays`

```js
// Create an Array
const tools = ['hammer', 'screwdriver']
const otherTools = ['wrench', 'saw']

// Unpack the tools Array into the allTools Array
const allTools = [...tools, ...otherTools]

// Add a new item
const updatedAllTools = [...allTools, 'parek']
```

#### `Convert Set to Array`

```js
// Create a set
const set = new Set()

set.add('octopus')
set.add('starfish')
set.add('whale')

// Convert Set to Array
const seaCreatures = [...set]
```

#### `Convert String to Array`

```js
const string = 'hello'

const stringArray = [...string]
```

#### `Spread with Objects`

```js
const user = {
  id: 3,
  name: 'Ron',
}

// add an item
const updatedUser = { ...user, isLoggedIn: true }

const user = {
  id: 3,
  name: 'Ron',
  organization: {
    name: 'Parks & Recreation',
    city: 'Pawnee',
  },
}

// add item in nested object
const updatedUser = { 
  ...user, 
  organization: {
    ...user.organization,
    position: 'Director'
  } 
}
```

#### `Spread with Function Calls`

```js
function multiply(a, b, c) {
  return a * b * c
}

const numbers = [1, 2, 3]
multiply(...numbers) // 12
```
  
</details>

## Rest operator

<details>
<summary>View contents</summary>
  
`The syntax appears the same as spread (...) but has the opposite effect. Instead of unpacking an array or object into individual values, the rest syntax will create an array or object of an indefinite number of arguments.`

```js
const [firstTool, ...rest] = ['hammer', 'screwdriver', 'wrench']
> firstTool // "hammer"
> rest // ["screwdriver", "wrench"]

const { isLoggedIn, ...rest } = { id: 1, name: 'Ben', isLoggedIn: true }
> isLoggedIn // true
> rest // { id: 1, name: 'Ben' }
```

```js
function multiply(...numbers) {
  return numbers.reduce((acc, num) => acc * num, 1)
}

multiply(1, 2, 3) // 6
```

```js
function multiply(firstNum, ...numbers) {
  console.log(firstNum) // 2
  
  return numbers.reduce((acc, num) => acc * num, 1)
}

multiply(2, 3, 4) // 12
```
  
</details>

## Function Arity

<details>
<summary>View contents</summary>

```js
/**
 * arity = the number of arguments a function takes
 */
const log = console.log
const functionArity = (func) => func.length

function add(a, b = 1) {
  log('arguments: ', arguments.length) // 4

  const sum = a + b
  console.log('sum: ', sum) // 3

  const argumentsSum = [...arguments].reduce((acc, val) => acc + val, 0)
  console.log('argumentsSum: ', argumentsSum) // 10
}

add(1, 2, 3, 4)
log('arity: ', functionArity(add)) // 1, since b has a default value
```
  
</details>

## IFFE (Immediately Invoked Function Expression) <sup>[ref](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)</sup>

<details>
<summary>View contents</summary>

__IFFE__ - runs as soon as it is defined.

```js
(function () {
  statements
})()
```

#### Use cases

- Avoid polluting the global namespace

```js
// If we have some initiation code that we don't need to use again,
// we could use the IIFE pattern.

(function () {
  // some initiation code
  let firstVariable;
  let secondVariable;
})();

// firstVariable and secondVariable will be discarded after the function is executed.
```

- The module pattern

```js
// We would also use IIFE to create private and public variables and methods.

const makeWithdraw = balance => (function(copyBalance) {
  let balance = copyBalance; // This variable is private
  let doBadThings = function() {
    console.log("I will do bad things with your money");
  };
  doBadThings();
  return {
    withdraw: function(amount) {
      if (balance >= amount) {
        balance -= amount;
        return balance;
      } else {
        return "Insufficient money";
      }
    },
  }
})(balance);

const firstAccount = makeWithdraw(100); // "I will do bad things with your money"
console.log(firstAccount.balance); // undefined
console.log(firstAccount.withdraw(20)); // 80
console.log(firstAccount.withdraw(30)); // 50
console.log(firstAccount.doBadThings); // undefined, this method is private
const secondAccount = makeWithdraw(20); // "I will do bad things with your money"
secondAccount.withdraw(30); // "Insufficient money"
secondAccount.withdraw(20);  // 0
```

</details>

## callback, promise, async/await and generator

<details>
<summary>View contents</summary>

#### Callback

```js
function getNumber(num, cb) {
  if(typeof num === 'number') {
    cb(undefined, num * 2)
  } else {
    cb('Number must be provided.')
  }
}

getNumber(6, (err, data) => { // data: 12
  if(err) {
    console.log(err)
  } else {
    getNumber(data, (err, data) => { // data: 24
      if(err) {
        console.log(err)
      } else {
        getNumber(data, (err, data) => { // data: 48
          if(err) {
            console.log(err)
          } else {
            console.log(data)
          }
        })
      }
    })
  }
})
```

#### Promise

```js
// ===================PROMISE===========================
const getNumberPromise = num => new Promise((resolve, reject) => {
  if(typeof num === 'number') {
    resolve(num * 2)
  } else {
    reject('Number must be provided.')
  }
})

// Promise Chaining
getNumberPromise(6)
  .then(data => getNumberPromise(data)) // data: 12
  .then(data => getNumberPromise(data)) // data: 24
  .then(data => console.log(`Promise: ${data}`)) // data: 48
  .catch(err => console.log(`Promise: ${err}`))

// async/await
const processData = async () => {
  try {
    let data = await getNumberPromise(6) // data: 12
    data = await getNumberPromise(data) // data: 24
    data = await getNumberPromise(data) // data: 48
    console.log(data)
  } catch(err) {
    console.log(err)
  }
}

processData()
```

#### Generator

```js
function* generator() {
  let num = yield 6 // num: 12
  num = yield num // num: 24
  num = yield num // num: 48

  console.log(num)
}

const gen = generator()

const handleGenerator = (yielded) => {
  if (!yielded.done) {
    handleGenerator(gen.next(yielded.value * 2))
  }
}

handleGenerator(gen.next())
```

OR

```js
const getNumberGen = (generator) => {
  const gen = generator()

  function handle(yielded) {
    if(!yielded.done) {
      if(typeof yielded.value === 'number') {
        handle(gen.next(yielded.value * 2))
      }
    }
  }

  return handle(gen.next())
}

getNumberGen(function* () {
  let num = yield 6 // num: 12
  num = yield num // num: 24
  num = yield num // num: 48
  console.log(`Generator: ${num}`)
})
```

</details>

## Function Composition

<details>
<summary>View contents</summary>

`function composition allows you to apply one function to the output of another function.`

```js
const makeLouder = (str) => str.toUpperCase();
const repeatThreeTimes = (str) => str.repeat(3);
const embolden = (str) => str.bold();

const makeLouderRepeatThreeTimesEmbolden = (str) => embolden(repeatThreeTimes(makeLouder(str)));

const compose = (...funcs) => args => funcs.reduceRight((arg, fn) => fn(arg), args);
const makeLouderRepeatThreeTimesEmbolden2 = compose(
  embolden,
  repeatThreeTimes,
  makeLouder
);

console.log(makeLouderRepeatThreeTimesEmbolden("hello")); // <b>HELLOHELLOHELLO</b>
console.log(makeLouderRepeatThreeTimesEmbolden("hello")); // <b>HELLOHELLOHELLO</b>
```

</details>

## Inversion of Control

<details>
<summary>View contents</summary>

#### Filter items from array (without inversion of control)
  
```js
function filter(arr, {
  filterNull = true,
  filterZero = true,
} = {}) {
  let newArr = []
  for (const item of arr) {
    if (filterNull && item === null || filterZero && item === 0) {
      continue
    }
    newArr[newArr.length] = item
  }
  return newArr
}

const arr = [0, 1, 2, null]
console.log(filter(arr, {filterNull: true, filterZero: true})) // [1, 2]
```
  
#### Filter items from array (using inversion of control)
  
```js
function filter(arr, filterFn) {
  let newArr = []
  for (const item of arr) {
    if (filterFn(item)){
      newArr[newArr.length] = item
    }
  }
  return newArr
}

const arr = [0, 1, 2, null]
const filterNullAndZero = item => item !== null && item !== 0
// console.log(filter(arr, item => item !== null && item !== 0)) // [1, 2]
console.log(filter(arr, filterNullAndZero)) // [1, 2]
```
  
</details>

## Fetch api

<details>
<summary>View contents</summary>

GET request (default)

```js
const url = "https://jsonplaceholder.typicode/users/1"
fetch(url) // call the fetch function passing the url of the API as a parameter
  .then(response => { // here we get a response (data) is an object with a series of methods
    return response.json() // Transform the data into json
  })
  .then(data => {
    console.log(data) // json data
  })
  .catch(err => {
    // catch errors if the server returns any errors
    console.log(err)
  })
```

__Response methods__

- clone() - As the method implies this method creates a clone of the response.
- redirect() - This method creates a new response but with a different URL.
- arrayBuffer() - In here we return a promise that resolves with an ArrayBuffer (ArrayBuffer, an array of bytes, is used to represent a generic, fixed-length raw binary data buffer. ).
- formData() - Also returns a promise but one that resolves with FormData object (FormData provides a way to easily construct a set of key/value pairs representing form fields and their values).
- blob() - This is one resolves with a Blob (A Binary Large OBject(BLOB) is a file-like object of immutable, raw data; they can be read as text or binary data).
- text() - In this case it resolves with a string.
- json() - Lastly we have the method to that resolves the promise with JSON (JavaScript Object Notation is a lightweight data-interchange format, that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and array data types. It is easy for machines to parse and generate).

Fetch api wrapper function

```js
const isObject = val => val !== null && !Array.isArray(val) && typeof val === 'object'
  
/**
 * handle server request using fetch api
 *
 * @param {Object} fetchArgs - arguments of fetch function
 * @param {string} fetchArgs.url - name of the api url
 * @param {string} [fetchArgs.method] - request method name
 * @param {unknown} [fetchArgs.data] - send data to server; datatype of data depends on api
 */
const apiCall = async ({ url, method = 'GET', data = null }) => {
  const fetchData = {
    method,
    ...isObject(data) && { body: JSON.stringify(data) }, // add body property if data is an object
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }

  try {
    // Handle response you get from the server
    const data = await (await fetch(url, fetchData)).json()
    return [data, null]
  } catch (err) {
    // Handle errors you get from the server
    return [null, err]
  }
}

const data = { title: "foo", body: "bar", userId: 1 }
const [data, err] = await apiCall({ url: "https://jsonplaceholder.typicode.com/posts", method: "POST", data })
  
if (err !== null) {
  // handle errors
}
  
console.log(data)
```

</details>

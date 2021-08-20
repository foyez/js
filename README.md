# Javascript

## var, let, const and hoisting

<details>
<summary>View contents</summary>

## var, let & const

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

## hoisting

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
  
## `this`

### 1. Global Context

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

### An Object Method

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

### A Class Constructor

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

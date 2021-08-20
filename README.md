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

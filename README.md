# Javascript

## Nullish coalescing operator (`??`), optional chaining operator (`?.`), logical OR (`||`) and Falsy

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

// ?. - like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), it returns undefined
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

# JS commenting

- Single comment

```js
// single line comment
```

- Multi-line comment

```js
/**
 * Multi-line comment
 */
```

- JSDoc to document a function

```js
/**
 * JSDoc to document a function
 *
 * @param {number} x - The number.
 * @param {Object} obj - The object to pass as argument.
 * @param {string} obj.name - The name key property
 * @param {number} [obj.age] - The age key property is optional
 * @param {{carName: string, color: string}[]} arr - The arr argument
 * @return {number} returns modified x.
 */
function func(x, obj, arr) {
  return x;
}
```

```js
func(x: number, obj: {
    name: string;
    age?: number;
}, arr: {
    carName: string;
    color: string;
}[]): number
```

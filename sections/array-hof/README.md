# Array & Higher Order Functions

#### 1. map

- map through a a list of items and return a new array.

```
array.map((currentValue [, index, array]) => {} [, thisArg])
```

Examples

```js
[4, 9, 16, 25].map(Math.sqrt); // [2, 3, 4, 5]
```

```js
[1, 2, 3].map((num) => num * 2); // [2, 4, 6]
```

#### 2. flatMap

- map through a a list of items and then flattening the result by one level.

```
array.flatMap((currentValue [, index, array]) => {} [, thisArg])
```

Examples

```js
// filter + map
[2, 3, [[[4]]]].flatMap((n) => (!(n % 2) ? [n * 2] : [])); // [4, 8]
```

#### 3. filter

#### 4. reduce

#### 5. reduceRight

#### 6. forEach

#### 7. sort

#### 8. every

#### 9. some

#### 10. slice

#### 11. splice

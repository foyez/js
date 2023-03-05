# Scoping

## Lexical (Static) Scope vs Dynamic Scope

Lexical Scope

```js
var x = 1;

function init() {
  var x = 2;
  print();
}

function print() {
  console.log(x);
}

init(); // 1
console.log(x) // 1
```

Dynamic Scope

```sh
#!/bin/bash

x=1

function init {
  x=2
  print
}

function print {
  echo $x
}

init # 2
echo $x # 2

# To run script file
# Set file to execute mode
# chmod +x filename.sh

#Run script
# sh filename.sh
# bash filename.sh
```
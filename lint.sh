#!/bin/bash

if (( $# != 0 )); then
  files="$@"
else
  files="$(find app -name \*.js -o -name \*.jsx) *.js"
fi

./node_modules/.bin/jsxhint ${files}

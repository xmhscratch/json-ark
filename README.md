# JSONscore

Edit json file with underscore.js chain method

## Installation
` $ npm install jsonscore`

## Usage
```js
var jsonscore = require('jsonscore');

/* 
 * alter metadata json file in the root directory
 * addnew and filter two new json object
 */
var metadata = jsonscore('metadata.json', {
    // json file encoding 
    encoding: 'utf8',
    // format json with replacer function
    replacer: null,
    // number of space between json object
    space: 4
})
  .extend({
      compile_sass: {
        run: false,
        time: 1405213450
      },
      minify_js: {
        run: true,
        time: 1405213454
      }
  })
  .filter(function(task) {
      return task.run ? false : true;
  })
  .write();

console.log(metadata);

```

**Using `lodash` instead of default `underscore` library**
```js
var jsonscore = require('jsonscore');
var _ = require('lodash');

jsonscore('metadata.json', {
  engine: _
}).extend(obj).write();
```

**Custom mixin methods**
```js
var jsonscore = require('jsonscore');
var _ = require('underscore');

_.mixin({
  filterWith: [Function]
});

jsonscore('metadata.json', {
  engine: _
}).filterWith(obj).write();
```

## API
**jsonscore(filepath, [, options])** return an underscore chain method
+ filepath String
+ options Object
  + engine Function | _ default = _
  + encoding String | Null default = 'utf8'
  + replacer Function | Null default = null [JSON format replacer paramter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  + space: Number | Null default = null [JSON format space paramter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)

**write()** write json object back into file return json data

## Authors
  [xmhscratch](http://github.com/xmhscratch)

## License
Licensed under the GPL license.

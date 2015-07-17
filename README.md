# jsonscore - update and extend json file

## Installation
` $ npm install jsonscore`

## Usage
```js
var jsonscore = require('jsonscore');

/* 
 * alter metadata json file in the root directory
 * addnew and filter two new json object
 */
jsonscore('metadata.json', {
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
  .write(function(error, data) {
      if(error) console.log(error);
      else console.log('json saved: ', data);
  });
```

## API
**jsonscore(filepath, [, options])** return an underscore chain method
+ filepath String
+ options Object
  + encoding String | Null default = 'utf8'
  + replacer Function | Null default = null [JSON format replacer paramter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter)
  + space: Number | Null default = null [JSON format space paramter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument)

**write(done)** write json object back into file
+ done: Function | Null default = null

## Authors
  [xmhscratch](http://github.com/xmhscratch)

## License
Licensed under the GPL license.

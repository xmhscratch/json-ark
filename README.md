# jsonscore - update and extend json file

## Installation
` $ npm install jsonscore`

## API
**jsonscore(filepath, [, options])**
+ filepath String
+ options Object
  + encoding String | Null default = 'utf8'
  + replacer Function | Null default = null
  +	space: Number | Null default = null
```js
var jsonscore = require('jsonscore');

jsonscore('metadata.json', {
	space: 4
}).extend({
  compile_css: {
    run: false,
    time: 1405213450
  }
}).write(function(error, data) {
  if(error) console.log(error);
  else console.log('json saved: ', data);
});
```

## Authors

**xmhscratch**

+ http://github.com/xmhscratch

## License
Licensed under the GPL license.
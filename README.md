# du-node-utils
dueros node utils

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/named-counter.svg
[npm-url]: https://npmjs.com/package/named-counter
[download-image]: https://img.shields.io/npm/dm/named-counter.svg
[download-url]: https://npmjs.com/package/named-counter
[david-image]: https://img.shields.io/david/imcooder/named-counter.svg
[david-url]: https://david-dm.org/imcooder/named-counter

# install
npm install named-counter -S
# usage
```javascript
const namedCounter = require('named-counter');
namedCounter.increase('all_cnt');
namedCounter.increaseOnce(req, 'req_cnt');
namedCounter.decrease('all_cnt');
namedCounter.decrease(req, 'req_cnt');
namedCounter.toString() // all_cnt:2  样式string
```

## 
increaseOnce: an same object increase once
decreaseOnce: an same object decrease once

## example
```javascript
express.use((req, res, next) => {
	namedCounter.increase('all_cnt');
	namedCounter.increaseOnce(req, 'req_cnt');
	onFinished(res, (err, res) => {
		namedCounter.decreaseOnce(req, 'req_cnt');
		namedCounter.decrease('all_cnt');
		if (err) {
			logger.warn('logid:%s onFinish error:%s', logid, err.stack);
		}
		console.log(namedCounter.toString());
	});
	next();
});
```

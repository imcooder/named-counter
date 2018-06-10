/**
 * @file 文件介绍 简单计数
 * @author: imcooder@gmail.com
 */
/* jshint node:true */
/* jshint esversion:6 */
/* eslint-disable fecs-camelcase */
/* eslint-disable fecs-no-require */
'use strict';
const duUtils = require('du-node-utils');
class NamedCounter {
    constructor() {
        this._counterMap = {};
        this.uuid = duUtils.makeUUID(true);
        this.incKey = '__namedcounter_' + this.uuid;
        this.decKey = '__namedcounter_' + this.uuid;
    }
    _getCounter(name) {
        let counter = null;
        if (!this._counterMap[name]) {
            counter = this._counterMap[name] = {
                num: 0
            };
        } else {
            counter = this._counterMap[name];
        }
        return counter;
    }
    increase(name, inc = 1) {
        let counter = this._getCounter(name);
        let old = counter.num;
        counter.num += inc;
        return old;
    }
    decrease(name, inc = 1) {
        let counter = this._getCounter(name);
        let old = counter.num;
        counter.num -= inc;
        return old;
    }

    increaseOnce(attachedObj, name, inc = 1) {
        if (attachedObj === null || attachedObj === undefined) {
            return;
        }
        if (attachedObj[this.incKey]) {
            return this.current(name);
        }
        attachedObj[this.incKey] = true;
        let counter = this._getCounter(name);
        let old = counter.num;
        counter.num += inc;
        return old;
    }
    decreaseOnce(attachedObj, name, inc = 1) {
        if (attachedObj === null || attachedObj === undefined) {
            return;
        }
        if (attachedObj[this.decKey]) {
            return this.current(name);
        }
        attachedObj[this.decKey] = true;
        let counter = this._getCounter(name);
        let old = counter.num;
        counter.num -= inc;
        return old;
    }

    reset(name) {
        let counter = this._getCounter(name);
        counter.num = 0;
    }
    current(name) {
        let counter = this._getCounter(name);
        return counter.num;
    }
    toString() {
        let tmpV = [];
        for(let key in this._counterMap) {
            tmpV.push(`${key}:${this._counterMap[key].num}`);
        }
        return tmpV.join(' ');
    }
}

module.exports = new NamedCounter();
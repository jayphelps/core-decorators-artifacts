'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = time;

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var _privateUtils = require('./private/utils');

var CONSOLE_NATIVE = console;

var labels = {};
var CONSOLE_TIME = console.time ? console.time.bind(console) : function (label) {
  labels[label] = new Date();
};
var CONSOLE_TIMEEND = console.timeEnd ? console.timeEnd.bind(console) : function (label) {
  var timeNow = new Date();
  var timeTaken = timeNow - labels[label];
  console.log('' + label + ': ' + timeTaken + 'ms');
};

var count = 0;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var _ref2$0 = _ref2[0];
  var prefix = _ref2$0 === undefined ? null : _ref2$0;
  var _ref2$1 = _ref2[1];
  var konsole = _ref2$1 === undefined ? null : _ref2$1;

  var fn = descriptor.value;
  var CONSOLE = konsole || CONSOLE_NATIVE;

  if (prefix === null) {
    prefix = '' + target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var time = CONSOLE.time || CONSOLE_TIME;
      var timeEnd = CONSOLE.timeEnd || CONSOLE_TIMEEND;
      var label = '' + prefix + '-' + count;
      count++;
      time(label);

      try {
        return fn.apply(this, arguments);
      } finally {
        timeEnd(label);
      }
    }
  });
}

function time() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _privateUtils.decorate)(handleDescriptor, args);
}

module.exports = exports['default'];
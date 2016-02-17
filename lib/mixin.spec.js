'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _mixin = require('./mixin');

var _mixin2 = _interopRequireDefault(_mixin);

var First = {
  bar: function bar() {
    return 'First';
  }
};

var Second = {
  bar: function bar() {
    return 'Second';
  }
};

var Third = {
  boom: function boom() {
    return 'Third';
  }
};

describe('mixin', function () {
  var foo = undefined;

  afterEach(function () {
    foo = null;
  });

  it('invokes function only once', function (done) {
    var Foo = (function () {
      function Foo() {
        _classCallCheck(this, _Foo);
      }

      var _Foo = Foo;

      _createClass(_Foo, [{
        key: 'bar',
        value: function bar() {
          return 'Foo';
        }
      }, {
        key: 'boom',
        value: function boom() {
          return _get(Object.getPrototypeOf(_Foo.prototype), 'boom', this).call(this) + ' Foo';
        }
      }]);

      Foo = (0, _mixin2['default'])(First, Second)(Foo) || Foo;
      return Foo;
    })();

    foo = new Foo();

    foo.bar().should.equal('First');
  });
});
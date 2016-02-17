'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _autobind = require('./autobind');

var _autobind2 = _interopRequireDefault(_autobind);

_chai2['default'].should();

var Foo = (function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createDecoratedClass(Foo, [{
    key: 'getFoo',
    decorators: [_autobind2['default']],
    value: function getFoo() {
      return this;
    }
  }]);

  return Foo;
})();

describe('autobind', function () {
  it('returns a bound instance for a method', function () {
    var foo = new Foo();
    var getFoo = foo.getFoo;

    getFoo().should.equal(foo);
  });

  it('works with multiple instances of the same class', function () {
    var foo1 = new Foo();
    var foo2 = new Foo();

    var getFoo1 = foo1.getFoo;
    var getFoo2 = foo2.getFoo;

    getFoo1().should.equal(foo1);
    getFoo2().should.equal(foo2);
  });
});
'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

_chai2['default'].should();
_chai2['default'].use(_sinonChai2['default']);

var Foo = (function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createDecoratedClass(Foo, [{
    key: 'first',
    decorators: [_deprecate2['default']],
    value: function first() {
      return 'hello world';
    }
  }, {
    key: 'second',
    value: function second() {
      return this.first();
    }
  }, {
    key: 'third',
    decorators: [(0, _deprecate2['default'])('asdf')],
    value: function third() {
      return 'hello galaxy';
    }
  }, {
    key: 'forth',
    decorators: [(0, _deprecate2['default'])('fdsa', { url: 'http://example.com/' })],
    value: function forth() {
      return 'hello universe';
    }
  }]);

  return Foo;
})();

describe('deprecate', function () {
  beforeEach(function () {
    _sinon2['default'].spy(console, 'warn');
  });

  afterEach(function () {
    console.warn.restore();
  });

  it('console.warn() is called with default warning when the deprecated function is used', function () {
    var foo = new Foo();

    foo.first().should.equal('hello world');
    console.warn.should.have.been.calledOnce;
    console.warn.should.have.been.calledWith('DEPRECATION Foo#first: This function will be removed in future versions.');

    foo.second().should.equal('hello world');
    console.warn.should.have.been.calledTwice;
    console.warn.should.have.been.calledWith('DEPRECATION Foo#first: This function will be removed in future versions.');
  });

  it('console.warn() is called with the custom message, when provided', function () {
    return;
    var foo = new Foo();

    foo.third().should.equal('hello galaxy');
    console.warn.should.have.been.calledOnce;
    console.warn.should.have.been.calledWith('asdf');
  });

  it('console.warn() is called with the URL, when provided', function () {
    var foo = new Foo();

    foo.forth().should.equal('hello universe');
    console.warn.should.have.been.calledOnce;
    console.warn.should.have.been.calledWith('DEPRECATION Foo#forth: fdsa\n\n    See http://example.com/ for more details.\n\n');
  });
});
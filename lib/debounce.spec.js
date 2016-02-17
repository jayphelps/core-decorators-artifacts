'use strict';

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _debounce = require('./debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var Editor = (function () {
  function Editor() {
    _classCallCheck(this, Editor);

    this.counter = 0;
  }

  _createDecoratedClass(Editor, [{
    key: 'updateCounter1',
    decorators: [(0, _debounce2['default'])(500)],
    value: function updateCounter1() {
      this.counter++;
    }
  }, {
    key: 'updateCounter2',
    decorators: [(0, _debounce2['default'])(500, true)],
    value: function updateCounter2() {
      this.counter++;
    }
  }]);

  return Editor;
})();

describe('debounce', function () {
  var editor = undefined;

  beforeEach(function () {
    editor = new Editor();
  });

  it('invokes function only once', function (done) {
    editor.updateCounter1();
    editor.counter.should.equal(0);

    setTimeout(function () {
      editor.counter.should.equal(1);
      done();
    }, 600);
  });

  it('invokes function immediately and only once if "immediate" option is true', function (done) {
    editor.updateCounter2();
    editor.counter.should.equal(1);

    // should still be 1 because 600ms hasn't yet passed
    setTimeout(function () {
      editor.counter.should.equal(1);
    }, 400);

    setTimeout(function () {
      editor.counter.should.equal(1);
      done();
    }, 600);
  });

  it('Separate instances do not share timers', function (done) {
    var editor2 = new Editor();
    editor.updateCounter1();
    editor2.updateCounter1();

    setTimeout(function () {
      editor.counter.should.equal(1);
      editor2.counter.should.equal(1);
      done();
    }, 600);
  });
});
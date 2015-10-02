'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function componentWrapper(WrappedComponent) {
  var KEYS = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  return (function (_React$Component) {
    _inherits(KeyBoardHelper, _React$Component);

    function KeyBoardHelper(props) {
      _classCallCheck(this, KeyBoardHelper);

      _get(Object.getPrototypeOf(KeyBoardHelper.prototype), 'constructor', this).call(this, props);
      this.state = {
        event: null
      };
      this.handleClick = this.handleClick.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    _createClass(KeyBoardHelper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleClick);
        this._node = _react2['default'].findDOMNode(this.refs.component);
        this._hasFocus = true;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleClick);
        this._node = null;
        this._hasFocus = false;
      }
    }, {
      key: 'handleClick',
      value: function handleClick(_ref) {
        var target = _ref.target;

        this._hasFocus = target === this._node || this._node.contains(target);
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(event) {
        var _this = this;

        if (this._hasFocus && (!KEYS || ~KEYS.indexOf(event.which))) {
          this.setState({ event: event }, function () {
            return _this.setState({ event: null });
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, {
          keyboard: this.state,
          ref: 'component'
        }));
      }
    }]);

    return KeyBoardHelper;
  })(_react2['default'].Component);
}

function keyboardDecorator() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var testArg = args[0];
  var isArray = Array.isArray(testArg);
  if (isArray || parseInt(testArg, 10)) {
    var _ret = (function () {
      var keysArg = isArray ? testArg : args;
      return {
        v: function (component) {
          return componentWrapper(component, keysArg);
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  } else {
    return componentWrapper.apply(undefined, args);
  }
}

exports['default'] = keyboardDecorator;
module.exports = exports['default'];

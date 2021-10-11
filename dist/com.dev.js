/**
 * COM-port használata JS-ből
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SerialScaleController =
/*#__PURE__*/
function () {
  function SerialScaleController() {
    _classCallCheck(this, SerialScaleController);

    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  _createClass(SerialScaleController, [{
    key: "init",
    value: function init() {
      var port, signals;
      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!('serial' in navigator)) {
                _context.next = 19;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(navigator.serial.requestPort());

            case 4:
              port = _context.sent;
              _context.next = 7;
              return regeneratorRuntime.awrap(port.open({
                baudRate: 9600
              }));

            case 7:
              this.reader = port.readable.getReader();
              _context.next = 10;
              return regeneratorRuntime.awrap(port.getSignals());

            case 10:
              signals = _context.sent;
              console.log(signals);
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              console.error('There was an error opening the serial port:', _context.t0);

            case 17:
              _context.next = 23;
              break;

            case 19:
              console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:');
              console.error('chrome://flags/#enable-experimental-web-platform-features');
              console.error('opera://flags/#enable-experimental-web-platform-features');
              console.error('edge://flags/#enable-experimental-web-platform-features');

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 14]]);
    }
  }, {
    key: "read",
    value: function read() {
      var readerData, sKartyaszam, errorMessage;
      return regeneratorRuntime.async(function read$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.reader.read());

            case 3:
              readerData = _context2.sent;
              //console.log(readerData);
              //csak az első 12 karakter kell!!!
              sKartyaszam = this.decoder.decode(readerData.value);

              if (sKartyaszam.length < 12) {
                sKartyaszam = "";
              } else {
                sKartyaszam = sKartyaszam.substr(0, 12);
              }

              return _context2.abrupt("return", sKartyaszam.trim());

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              errorMessage = "error reading data: ".concat(_context2.t0);
              console.error(errorMessage);
              return _context2.abrupt("return", errorMessage);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }]);

  return SerialScaleController;
}();
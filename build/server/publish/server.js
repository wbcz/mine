'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var publishApp = new _koa2.default();
var router = new _koaRouter2.default();

var SUBSCRIPTION_FILE = _path2.default.resolve(__dirname, '../data/subscriptions.txt');

var parseSubscriptions = function parseSubscriptions(string) {
    return string.split('\n').filter(function (item) {
        return !!item;
    }).map(function (item) {
        return JSON.parse(item);
    });
};
var stringifySubscriptions = function stringifySubscriptions(subscriptions) {
    return subscriptions.map(function (item) {
        return (0, _stringify2.default)(item);
    }).join('\n');
};

var readSubscriptions = function readSubscriptions() {
    return new _promise2.default(function (resolve) {
        _fs2.default.readFile(SUBSCRIPTION_FILE, 'utf8', function (err, buffer) {
            console.log(err, 'err');
            if (err) {
                resolve([]);
            } else {
                var string = buffer.toString();
                var subscriptions = parseSubscriptions(string);
                console.log(subscriptions, 'subscriptions66666666666');
                resolve(subscriptions);
            }
        });
    });
};

var writeSubscription = function writeSubscription(subscriptions) {
    return new _promise2.default(function (resolve, reject) {
        console.log(subscriptions, '费汗臭');
        _fs2.default.writeFile(SUBSCRIPTION_FILE, stringifySubscriptions(subscriptions), 'utf8', function (err) {
            console.log(err, '999999');
            if (err) reject(err);

            resolve();
        });
    });
};

var addSubscription = function addSubscription(subscription) {
    return readSubscriptions().then(function (subscriptions) {
        if (!subscriptions.find(function (item) {
            return item.endpoint === subscription.endpoint;
        })) {
            subscriptions.push(subscription);
        }
        console.log(subscriptions, '4567890');
        //console.log(subscriptions, 'subscriptions')
        return subscriptions;
    }).then(writeSubscription);
};

var removeSubscription = function removeSubscription(subscription) {
    return readSubscriptions().then(function (subscriptions) {
        var index = subscriptions.findIndex(function (item) {
            return item.endpoint === subscription.endpoint;
        });
        if (index > -1) {
            subscriptions.splice(index, 1);
        }

        return subscriptions;
    }).then(writeSubscription);
};

router.post('/subscribe', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _coBody2.default)(ctx.request);

                    case 2:
                        body = _context.sent;
                        _context.next = 5;
                        return addSubscription(body).then(function () {
                            ctx.status = 200;
                            ctx.body = {};
                        }).catch(function (err) {
                            console.log(888);
                            ctx.status = 500;
                            ctx.body = err;
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}()).post('/unsubscribe', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
        var body;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _coBody2.default)(ctx.request);

                    case 2:
                        body = _context2.sent;
                        _context2.next = 5;
                        return removeSubscription(body).then(function () {
                            ctx.status = 200;
                            ctx.body = {};
                        }).catch(function (err) {
                            ctx.status = 500;
                            ctx.body = err;
                        });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x2) {
        return _ref2.apply(this, arguments);
    };
}()).post('/broadcast', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
        var body;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return (0, _coBody2.default)(ctx.request);

                    case 2:
                        body = _context3.sent;
                        _context3.next = 5;
                        return readSubscriptions().then(function (subscriptions) {
                            ctx.status = 200;
                            ctx.body = {};

                            subscriptions.forEach(function (subscription) {
                                _webPush2.default.sendNotification(subscription, (0, _stringify2.default)(body), { gcmAPIKey: _config.gcmAPIKey }).catch(function (err) {
                                    console.error(err);
                                    // retain the subscription, if the error cause by network not access (GREAT WALL)
                                    if (err.code !== 'ETIMEDOUT') removeSubscription(subscription);
                                });
                            });
                        }).catch(function (err) {
                            ctx.status = 500;
                            ctx.body = err;
                        });

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x3) {
        return _ref3.apply(this, arguments);
    };
}());

publishApp.use(router.routes()).use(router.allowedMethods());

console.log(_koa2.default, 'publishApp');
exports.default = publishApp;
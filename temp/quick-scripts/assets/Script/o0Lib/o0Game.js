(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/o0Lib/o0Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ae883we4NBLZXo5ebCQiAe', 'o0Game', __filename);
// Script/o0Lib/o0Game.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var o0 = require('o0');
var o0CC = require('o0CC');
//for this game

var GroupIndex = {
    Default: 0,
    Food: 1,
    Head: 2,
    Body: 3,
    PlayGround: 4,
    UI: 5
};

var Tag = {
    Default: 0,
    Ground: 1,
    Player: 2,
    Chainsaw: 3,
    PlayGround: 4,
    Others: 5
};

module.exports = {
    GroupIndex: GroupIndex,
    Tag: Tag,
    Connection: function () {
        function Connection(onClose) {
            _classCallCheck(this, Connection);

            var self = this;
            this.State = {
                Disconnect: 0,
                Connect: 1,
                Waiting: 2,
                Game: 3 };
            this.address = 'localhost:8080';
            if (window != undefined && window.location != undefined && window.location.hostname != undefined) {
                this.address = window.location.hostname + ':8080';
            }
            this.webSocket = null;
            this.id = null;
            this.state = this.State.Disconnect;
            this.players = null;
            this.host = null;
            this.playerNumber = 2;

            this.onStart = null;
            this.onReceiving = null;
            this.onClose = onClose;
            this.onHostChange = null;

            o0CC.log('Connection');
            o0CC.log(this.address);
            try {
                this.webSocket = new WebSocket('ws://' + this.address);
            } catch (err) {
                o0CC.log('new connection fail: ' + err);
                self.onClose();
                return;
            }
            this.webSocket.onopen = function (event) {
                this.connectionState = self.State.Connect;
                console.log("Send Text WS was opened.");
            };
            this.webSocket.onmessage = function (event) {
                self.processData(event);
            };
            this.webSocket.onerror = function (event) {
                self.onClose();
                console.log("Send Text fired an error");
            };
            this.webSocket.onclose = function (event) {
                self.onClose();
                console.log("WebSocket instance closed.");
            };
            //this.test();
        }

        _createClass(Connection, [{
            key: 'setState',
            value: function setState(state, data) {
                this.state = state;
                if (state == this.State.Connect) {
                    this.send({ 'maxPlayer': this.playerNumber, 'joinCondition': 0 });
                } else if (state == this.State.Game) {
                    this.random = new o0.Random(data['seed']);
                    this.players = data['players'];
                    //this.players.sort(function(a,b){ return a - b });
                    o0CC.log("Game Init");
                    this.onStart();
                }
            }
        }, {
            key: 'processData',
            value: function processData(event) {
                if (typeof event.data != "string") {
                    return;
                }

                //cc.log(event.data);
                var serverData = JSON.parse(event.data);
                var id = serverData['id'];
                var state = serverData['state'];
                var data = serverData['data'];
                var host = serverData['host'];
                if (this.id == null) {
                    if (id != null) {
                        this.id = id;
                    } else {
                        return;
                    }
                }
                if (this.id == id && state != null) {
                    this.setState(state, serverData);
                    //this.test();
                }
                if (host != null) {
                    if (this.host != host) {
                        this.host = host;
                        this.onHostChange(host);
                    }
                }
                if (this.state == this.State.Game && data != null && id != null) {
                    this.onReceiving(id, data);
                }
            }
        }, {
            key: 'send',
            value: function send(data) {
                var jsonData = JSON.stringify(data);
                //cc.log(jsonData);
                var self = this;
                setTimeout(function () {
                    if (self.webSocket != null && self.webSocket.readyState === WebSocket.OPEN) {
                        self.webSocket.send(jsonData);
                    } else {
                        console.log("WebSocket instance wasn't ready...");
                    }
                }, 3);
            }
        }]);

        return Connection;
    }()
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=o0Game.js.map
        
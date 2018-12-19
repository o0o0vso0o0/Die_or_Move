(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameElements/Control/MODAIControlModeChainsaw.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6ee88+XqJZFj6jc0xFnLFTA', 'MODAIControlModeChainsaw', __filename);
// Script/GameElements/Control/MODAIControlModeChainsaw.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: cc.Component,
    properties: {
        player: null, //被控制的角色

        map: null,
        players: null, //所有角色，包括自身
        chainsaws: null
    },
    onLoad: function onLoad() {
        if (this.player == null) {
            this.player = this.node.getComponent('MODCharacter');
            if (this.player == null) {
                o0CC.log('player null');
            }
        }
    },
    start: function start() {
        cc.log('AI: ' + this.players[this.player.name].name);
        cc.log('Map: ' + this.map);
        cc.log('Chainsaws: ' + this.chainsaws);
    },
    update: function update() {
        //this.player.setMotionState(-1);
        //this.player.setMotionState(0);
        //this.player.setMotionState(1);
        //this.player.jump();
    },
    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});

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
        //# sourceMappingURL=MODAIControlModeChainsaw.js.map
        
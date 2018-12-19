(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameElements/Control/MODTouchControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f471SRBgVK9YBZoMegReoj', 'MODTouchControl', __filename);
// Script/GameElements/Control/MODTouchControl.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');

cc.Class({
    extends: cc.Component,
    properties: {
        player: null,
        UINode: null,

        keyDirection: null,
        key: null,

        leftButton: null,
        rightButton: null,

        jumpButton: null
    },
    update: function update() {
        var screen = cc.view.getVisibleSize();

        //this.leftButton.node.x = 30+this.leftButton.node.width-screen.width/2;
        //this.leftButton.node.y = 30+this.leftButton.node.height-screen.height/2;
        this.leftButton.node.x = 40 + (this.leftButton.node.width - screen.width) / 2;
        this.leftButton.node.y = 40 + (this.leftButton.node.height - screen.height) / 2;

        this.rightButton.node.x = this.rightButton.node.width + this.leftButton.node.x;
        this.rightButton.node.y = this.leftButton.node.y; /** */

        this.jumpButton.node.x = -40 - (this.leftButton.node.width - screen.width) / 2;
        this.jumpButton.node.y = 40 + (this.leftButton.node.height - screen.height) / 2;
    },

    start: function start() {
        if (this.player == null) {
            this.player = this.node.getComponent('MODCharacter');
            if (this.player == null) {
                o0CC.log('player null');
            }
        }
        var self = this;

        this.keyDirection = {};
        this.key = {};

        this.leftButton = o0CC.addNode(this.UINode, 10, 'o0CCButton').getComponent('o0CCButton');
        this.leftButton.node.width = 100;
        this.leftButton.node.height = 100; /** */
        this.leftButton.name = '←';
        this.leftButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.key[this.leftButton.name] = true;
            self.updateMotionState();
        }, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.key[this.leftButton.name] = false;
            self.updateMotionState();
        }, this);
        this.leftButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.key[this.leftButton.name] = false;
            self.updateMotionState();
        }, this);
        this.keyDirection[this.leftButton.name] = -1;

        this.rightButton = o0CC.addNode(this.UINode, 10, 'o0CCButton').getComponent('o0CCButton');
        this.rightButton.node.width = 100;
        this.rightButton.node.height = 100; /** */
        this.rightButton.name = '→';
        this.rightButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.key[this.rightButton.name] = true;
            self.updateMotionState();
        }, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.key[this.rightButton.name] = false;
            self.updateMotionState();
        }, this);
        this.rightButton.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.key[this.rightButton.name] = false;
            self.updateMotionState();
        }, this);
        this.keyDirection[this.rightButton.name] = 1;

        this.jumpButton = o0CC.addNode(this.UINode, 10, 'o0CCButton').getComponent('o0CCButton');
        this.jumpButton.node.width = 100;
        this.jumpButton.node.height = 100; /** */
        this.jumpButton.name = '↑';
        this.jumpButton.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.player.jump();
        }, this);
    },
    onDestroy: function onDestroy() {},


    updateMotionState: function updateMotionState() {
        var targetVector = 0;
        for (var _key in this.keyDirection) {
            if (this.key[_key] == true) {
                targetVector += this.keyDirection[_key];
            }
        }
        this.player.setMotionState(targetVector);
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
        //# sourceMappingURL=MODTouchControl.js.map
        
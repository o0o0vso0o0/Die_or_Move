(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MODMain.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ffb9W9jaROgIjat+bccYpD', 'MODMain', __filename);
// Script/MODMain.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Canvas
        }
    },

    onLoad: function onLoad() {

        cc.director.getPhysicsManager().enabled = true; //初始化物理必须在onload里面 开启物理引擎/** */
        //cc.director.getCollisionManager().enabled = true;

        cc.director.setDisplayStats(false); //关闭左下角debug窗口

        //cc.director.getCollisionManager().enabledDebugDraw  = true;
        //o0CC.log('dsa');


        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit | cc.PhysicsManager.DrawBits.e_jointBit | cc.PhysicsManager.DrawBits.e_shapeBit; /** */
        /*cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit;/** */
    },

    // use this for initialization
    start: function start() {

        //this.gameNode = o0CC.addNode(null,0);
        //this.gameCamera = this.UINode.addComponent(cc.Camera);
        //this.gameCamera.addTarget(this.gameNode);
        //cc.director.getPhysicsManager().attachDebugDrawToCamera(this.gameCamera);
        //cc.director.getCollisionManager().attachDebugDrawToCamera(this.gameCamera);


        //this.canvas.node.x = 0;
        //this.canvas.node.y = 0;

        var gameScene = this.node.addComponent('MODRemoteGame');
        //var gameScene = o0CC.addNode(this.UINode,0,'MODGame').getComponent('MODGame');
    },

    // called every frame
    update: function update(dt) {
        //o0CC.log(471);
        /*o0CC.log(this.canvas.node.width);
        this.camera.node.x = this.canvas.node.x;
        this.camera.node.y = this.canvas.node.y;/** */
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
        //# sourceMappingURL=MODMain.js.map
        
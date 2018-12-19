(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/MODGame.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'be1e16YMGpJ26F9Ek5R3+jl', 'MODGame', __filename);
// Script/MODGame.js

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
        },
        UINode: {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Camera
        },
        gameNode: {
            default: null,
            type: cc.Node
        },
        map: null,
        players: [],
        chainsaws: []
    },

    // use this for initialization
    onLoad: function onLoad() {
        //cc.director.getPhysicsManager().gravity = cc.v2(0, 0);//
        cc.director.getPhysicsManager().gravity = cc.v2(0, -4000); //
    },
    // use this for initialization
    start: function start() {
        if (this.canvas == null) {
            this.canvas = this.node.getComponent(cc.Canvas);
            if (this.canvas == null) {
                o0CC.log('canvas null');
            }
        }
        this.gameNode = o0CC.addNode(this.canvas.node, 0);
        this.UINode = o0CC.addNode(this.canvas.node, 1);
        this.camera = this.UINode.addComponent(cc.Camera);
        this.camera.addTarget(this.gameNode);
        this.camera.addTarget(this.UINode);
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
        cc.director.getCollisionManager().attachDebugDrawToCamera(this.camera); /** */
        //cc.director.getPhysicsManager().gravity = cc.v2(0, 0);//
        //cc.director.getPhysicsManager().gravity = cc.v2(0, -640);//


        this.map = o0CC.addNode(this.gameNode, 0, 'MODMap001').getComponent('MODMap001');
        for (var i = 0; i < 4; ++i) {
            this.players.push(o0CC.addNode(this.gameNode, 0, 'MODCharacter').getComponent('MODCharacter'));
            this.players[i].node.setPosition(this.map.initPositions[i]);
            this.players[i].name = 'player ' + i;
            this.chainsaws.push(o0CC.addNode(this.gameNode, 0, 'MODChainsaw').getComponent('MODChainsaw'));
            this.chainsaws[i].node.setPosition(this.map.initPositions[i]);
            this.chainsaws[i].connect(this.players[i]);
            this.chainsaws[i].name = 'chainsaw ' + i;
        }
        this.players[0].addComponent('MODControl');
        //o0CC.setGroup(this.players[0].getComponent('MODCharacter'),1);
        //this.players.push(o0CC.addNode(this.gameNode,0,'MODCharacter'));

    },

    // called every frame
    update: function update(dt) {
        var screen = cc.view.getVisibleSize();
        var scale = screen.height / 1000.0;
        this.camera.zoomRatio = scale; /** */
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
        //# sourceMappingURL=MODGame.js.map
        
"use strict";
cc._RF.push(module, '538e5kfpstNk7W1vG1AdSKq', 'MODRemoteGame');
// Script/MODRemoteGame.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

var State = {
    Disconnect: 0,
    Connect: 1,
    Waiting: 2,
    Game: 3
};

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Canvas
        },
        UIcamera: {
            default: null,
            type: cc.Camera
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
        players: null,
        chainsaws: [],

        random: null,

        connection: null,

        remote: false //联网游戏
    },
    initGame: function initGame(random, players, id) {
        var self = this;

        var orderedPlayer = o0.keyToArray(players);
        orderedPlayer.sort(function (a, b) {
            return a - b;
        });

        var randomPosition = [];
        for (var i = 0; i < 4; ++i) {
            randomPosition[i] = i;
        }
        randomPosition.sort(function () {
            return 0.5 - random.float();
        });

        self.map = o0CC.addNode(self.gameNode, 0, 'MODMap001').getComponent('MODMap001');
        for (var i in orderedPlayer) {
            var playerId = orderedPlayer[i];
            self.players[playerId] = o0CC.addNode(self.gameNode, 0, 'MODCharacter').getComponent('MODCharacter');
            self.players[playerId].node.setPosition(self.map.initPositions[randomPosition[i]]);
            self.players[playerId].name = playerId;
            self.players[playerId].node.name = playerId;
            self.chainsaws.push(o0CC.addNode(self.gameNode, 0, 'MODChainsaw').getComponent('MODChainsaw'));
            self.chainsaws[i].node.setPosition(self.map.initPositions[randomPosition[i]]);
            self.chainsaws[i].connectPlayer(self.players[playerId]);
            self.chainsaws[i].name = 'chainsaw ' + i;
            self.chainsaws[i].map = self.map;
            self.chainsaws[i].host = !this.remote || self.connection.host;
        }
        for (var i in orderedPlayer) {
            self.chainsaws[i].players = self.players;
        }
        self.players[id].addComponent('MODKeyboardControl');
        self.players[id].addComponent('MODTouchControl').UINode = self.UINode;
        if (this.remote) {
            self.players[id].onSendingInput = function (data) {
                self.connection.send({ 'input': data });
            }; /** */
        }
        for (var i in self.players) {
            if (players[i] == false) {
                var AI = self.players[i].addComponent('MODAIControlModeChainsaw');
                AI.map = this.map;
                AI.players = this.players;
                AI.chainsaws = this.chainsaws;
            }
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        //cc.director.getPhysicsManager().gravity = cc.v2(0, 0);//
        cc.director.getPhysicsManager().gravity = cc.v2(0, -4000); //
    },
    // use this for initialization
    start: function start() {
        var self = this;

        if (this.canvas == null) {
            this.canvas = this.node.getComponent(cc.Canvas);
            if (this.canvas == null) {
                o0CC.log('canvas null');
            }
        }
        this.gameNode = o0CC.addNode(this.canvas.node, 0);
        this.camera = this.gameNode.addComponent(cc.Camera);
        this.camera.addTarget(this.gameNode);
        this.UINode = o0CC.addNode(this.canvas.node, 1);
        //this.UIcamera = this.UINode.addComponent(cc.Camera);
        //this.UIcamera.addTarget(this.UINode);
        //this.camera.addTarget(this.UINode);
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera);
        cc.director.getCollisionManager().attachDebugDrawToCamera(this.camera); /** */

        this.players = {}; //不能在properties里初始化

        if (this.remote) {
            this.connection = new o0Game.Connection(function () {
                self.connection = null;
                if (self.node != null && self.node.active == true) {
                    self.node.active = false;
                    self.node.destroy();
                    o0CC.log('connection close');
                }
            });
            this.connection.onStart = function () {
                self.initGame(this.random, this.players, this.id);
                /*
                                var randomPosition = [];
                                for(var i =0;i<4;++i){
                                    randomPosition[i] = i;
                                }
                                var random = this.random;
                                randomPosition.sort(function(){ return 0.5 - random.float() });
                    
                                self.map = o0CC.addNode(self.gameNode,0,'MODMap001').getComponent('MODMap001');
                                for(var i in this.players){
                                    var playerId = this.players[i];
                                    self.players[playerId] = o0CC.addNode(self.gameNode,0,'MODCharacter').getComponent('MODCharacter');
                                    self.players[playerId].node.setPosition(self.map.initPositions[randomPosition[i]]);
                                    self.players[playerId].name = playerId;
                                    self.players[playerId].node.name = playerId;
                                    self.chainsaws.push(o0CC.addNode(self.gameNode,0,'MODChainsaw').getComponent('MODChainsaw'));
                                    self.chainsaws[i].node.setPosition(self.map.initPositions[randomPosition[i]]);
                                    self.chainsaws[i].connectPlayer(self.players[playerId]);
                                    self.chainsaws[i].name = 'chainsaw '+i;
                                    self.chainsaws[i].map = self.map;
                                    //self.chainsaws[i].host = self.connection.host;
                                }
                                for(var i in this.players){
                                    self.chainsaws[i].players = self.players;
                                }
                                self.players[this.id].addComponent('MODKeyboardControl');
                                self.players[this.id].addComponent('MODTouchControl').UINode = self.UINode;
                                self.players[this.id].onSendingInput = function(data){
                                    self.connection.send({'input':data});
                                }/** */
            };
            this.connection.onHostChange = function (host) {
                for (var i in self.chainsaws) {
                    self.chainsaws[i].host = host;
                }
            };
            this.connection.onReceiving = function (id, data) {
                if (data['input'] != null && self.players[id] != null) {
                    self.players[id].receivingInput(data['input']);
                }
                var playerData = data['player'];
                if (playerData != null && self.players[id] != null) {
                    for (var i in playerData) {
                        if (i == self.connection.id) {
                            continue;
                        }
                        self.players[i].syncData(playerData[i]);
                    }
                }
                var chainsawData = data['chainsaw'];
                if (chainsawData != null && self.connection.host != true) {
                    for (var i in self.chainsaws) {
                        //cc.log('222222222222222222222');
                        self.chainsaws[i].syncData(chainsawData[i]);
                    }
                }
            };
        } else {
            self.initGame(new o0.Random(), { 'Player_0': true, 'Player_1': false, 'Player_2': false, 'Player_3': false }, 'Player_0');
        }

        //o0CC.setGroup(this.players[0].getComponent('MODCharacter'),1);
        //this.players.push(o0CC.addNode(this.gameNode,0,'MODCharacter'));

    },

    // called every frame
    update: function update(dt) {
        var screen = cc.view.getVisibleSize();
        var scale = screen.height / 1000.0;
        //this.camera.zoomRatio = 1;/** */
        this.camera.zoomRatio = scale; /** */
        //cc.log(scale);
        //this.UIcamera.zoomRatio = 1;/** */


        if (this.remote) {
            if (this.connection.state == this.connection.State.Game) {
                var playerData = {};
                var chainsawData = {};
                if (this.connection.host) {
                    for (var i in this.players) {
                        playerData[i] = this.players[i].toData();
                    }
                    for (var i in this.chainsaws) {
                        chainsawData[i] = this.chainsaws[i].toData();
                    }
                } else {
                    playerData[this.connection.id] = this.players[this.connection.id].toData();
                }
                this.connection.send({ 'player': playerData, 'chainsaw': chainsawData });
            }
        }
        //this.send({'test':'test'});
    }

});

cc._RF.pop();
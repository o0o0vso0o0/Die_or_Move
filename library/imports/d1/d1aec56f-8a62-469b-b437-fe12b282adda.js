"use strict";
cc._RF.push(module, 'd1aecVvimJGm7Q3/hKygq3a', 'MODMap001');
// Script/GameElements/MODMap001.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        initPositions: [], //[cc.v2(300,120),cc.v2(-300,120),cc.v2(700,120),cc.v2(-700,120)],
        walls: []
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.tag = o0Game.Tag.Ground;

        this.initPositions.push(cc.v2(300, 120));
        this.initPositions.push(cc.v2(-300, 120));
        this.initPositions.push(cc.v2(700, 120));
        this.initPositions.push(cc.v2(-700, 120));

        o0CC.addSprite(this.node, 'maps/BG');
        /*
        var rigidBody = this.node.addComponent(cc.RigidBody);
        rigidBody.type = cc.RigidBodyType.Static;
        var collider = this.node.addComponent(cc.PhysicsPolygonCollider);
        //o0CC.addSpriteNode(null,'maps/BG');
        collider.points = [cc.v2(-40,-300),
            cc.v2(40,-300),
            cc.v2(830,100),
            cc.v2(830,370),
            cc.v2(700,430),
            cc.v2(-700,430),
            cc.v2(-830,370),
            cc.v2(-830,100),
            cc.v2(-40,-300),
            cc.v2(-960,-540),
            cc.v2(-960,540),
            cc.v2(960,540),
            cc.v2(960,-540),
            cc.v2(-960,-540)];
        collider.apply();/** */

        var block1 = o0CC.addNode(this.node, 0, cc.RigidBody, cc.PhysicsPolygonCollider);
        block1.tag = o0Game.Tag.Ground;
        block1.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        var collider1 = block1.getComponent(cc.PhysicsPolygonCollider);
        collider1.points = [cc.v2(-300, -37), cc.v2(-300, 29), cc.v2(-100, 29), cc.v2(-100, -37)];
        collider1.apply();
        this.walls.push(collider1);

        var block2 = o0CC.addNode(this.node, 0, cc.RigidBody, cc.PhysicsPolygonCollider);
        block2.tag = o0Game.Tag.Ground;
        block2.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        var collider2 = block2.getComponent(cc.PhysicsPolygonCollider);
        collider2.points = [cc.v2(166, -37), cc.v2(166, 29), cc.v2(300, 29), cc.v2(300, -37)];
        collider2.apply();
        this.walls.push(collider2);

        var block3 = o0CC.addNode(this.node, 0, cc.RigidBody, cc.PhysicsPolygonCollider);
        block3.tag = o0Game.Tag.Ground;
        block3.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        var collider3 = block3.getComponent(cc.PhysicsPolygonCollider);
        collider3.points = [cc.v2(-40, -300), cc.v2(40, -300), cc.v2(830, 100), cc.v2(830, 370), cc.v2(700, 430), cc.v2(-700, 430), cc.v2(-830, 370), cc.v2(-830, 100), cc.v2(-40, -300), cc.v2(-960, -540), cc.v2(-960, 540), cc.v2(960, 540), cc.v2(960, -540), cc.v2(-960, -540)];
        collider3.apply();
        this.walls.push(collider3);
    },

    // called every frame
    update: function update(dt) {
        //cc.log(12312312113);
    }
});

cc._RF.pop();
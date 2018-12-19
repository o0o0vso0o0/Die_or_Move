"use strict";
cc._RF.push(module, 'a390fSWhn5CcJAweT7/b54d', 'MODCharacterFeet');
// Script/GameElements/MODCharacterFeet.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        rigidBody: null,
        standing: 0
    },
    onLoad: function onLoad() {
        this.node.tag = o0Game.Tag.Others;
        this.rigidBody = this.node.addComponent(cc.RigidBody);
        //this.rigidBody.fixedRotation = true;
        this.rigidBody.enabledContactListener = true;
        this.rigidBody.gravityScale = 0;
        //this.rigidBody.type = cc.RigidBodyType.Static;

        var collider = this.node.addComponent(cc.PhysicsBoxCollider);
        collider.sensor = true;
        collider.size = new cc.Size(110, 1);
        collider.density = 0;
        collider.apply();
    },
    start: function start() {
        //o0CC.log('sdaada');


        /*var joint = this.node.addComponent(cc.WeldJoint);
        joint.connectedBody = this.bodyRigidBody;
        joint.anchor = cc.v2(0,40);
        joint.apply();/** */
    },

    // called every frame
    update: function update(dt) {
        /*
        if(this.standing > 0){
            cc.log(this.standing);
        }/** */
    },

    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.tag == o0Game.Tag.Ground || otherCollider.node.tag == o0Game.Tag.Player) {
            this.standing += 1;
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.tag == o0Game.Tag.Ground || otherCollider.node.tag == o0Game.Tag.Player) {
            this.standing -= 1;
        }
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function onPreSolve(contact, selfCollider, otherCollider) {
        //cc.log(this.standing);
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function onPostSolve(contact, selfCollider, otherCollider) {
        //cc.log(this.standing);
    }
});

cc._RF.pop();
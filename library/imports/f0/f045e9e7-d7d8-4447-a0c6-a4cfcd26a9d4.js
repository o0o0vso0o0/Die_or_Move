"use strict";
cc._RF.push(module, 'f045enn19hER6DGpM/NJqnU', 'MODChainsaw');
// Script/GameElements/MODChainsaw.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        joint: null,
        rigidBody: null,
        collider: null,
        invinciblePlayer: [], //无敌状态

        nameLabel: null,
        host: false,
        players: null,
        map: null
    },

    toData: function toData() {
        if (this.joint == null) {
            //空中
            return { 'joint': false,
                'sensor': this.collider.sensor,
                'rot': this.node.rotation,
                'pos': this.node.position,
                'vel': this.rigidBody.linearVelocity };
        } else if (this.joint.connectedBody.node.tag == o0Game.Tag.Player) {
            /*//玩家手上
            return {'joint':true,
            'sensor':this.collider.sensor,
            'rot':this.joint.referenceAngle,
            'pos':this.joint.connectedAnchor,
            'conTag':this.joint.connectedBody.node.tag,
            'conId':this.joint.connectedBody.node.name};/** */
            return { 'joint': true,
                'sensor': this.collider.sensor,
                'conTag': this.joint.connectedBody.node.tag,
                'conId': this.joint.connectedBody.node.name }; /** */
        } else {
            // if(this.joint.connectedBody.node.tag == o0Game.Tag.Ground){//插地上
            return { 'joint': true,
                'sensor': this.collider.sensor,
                'rot': this.joint.referenceAngle,
                'pos': this.joint.connectedAnchor,
                'conTag': this.joint.connectedBody.node.tag };
        }
    },
    syncData: function syncData(data) {
        if (data.joint == false && this.joint != null) {
            this.disconnect();
            this.node.rotation = data.rot;
            this.node.x = data.pos.x;
            this.node.y = data.pos.y;
            this.rigidBody.linearVelocity.x = data.vel.x;
            this.rigidBody.linearVelocity.y = data.vel.y;
        } else if (data.joint == true && (this.joint == null || this.joint.connectedBody.node.tag != data.conTag || this.joint.connectedBody.node.tag == o0Game.Tag.Player && this.joint.connectedBody.node.name != data.conId)) {
            if (data.conTag == o0Game.Tag.Ground) {
                this.connectGround(this.map);
                this.joint.referenceAngle = data.rot;
                this.joint.connectedAnchor.x = data.pos.x;
                this.joint.connectedAnchor.y = data.pos.y;
                this.joint.apply();
            } else if (data.conTag == o0Game.Tag.Player) {
                this.connectPlayer(this.players[data.conId]);
                //this.updateJoint(this.players[data.conId].node.scaleX);
            }
        } else if (this.joint == null && data.joint == false) {
            this.node.rotation = o0.blend(this.node.rotation, data.rot, 0.1);
            this.node.x = o0.blend(this.node.x, data.pos.x, 0.1);
            this.node.y = o0.blend(this.node.y, data.pos.y, 0.1);
            this.rigidBody.linearVelocity.x = o0.blend(this.rigidBody.linearVelocity.x, data.vel.x, 0.3);
            this.rigidBody.linearVelocity.y = o0.blend(this.rigidBody.linearVelocity.y, data.vel.y, 0.3);
        } /*else if(this.joint != null && data.joint == true){
             if((this.joint.connectedBody.node.tag == o0Game.Tag.Ground && data.conTag == o0Game.Tag.Ground)
                 ||(this.joint.connectedBody.node.tag == o0Game.Tag.Player && data.conTag == o0Game.Tag.Player && this.joint.connectedBody.node.name == data.conId)){
                 this.joint.referenceAngle = o0.blend(this.joint.referenceAngle,data.rot,0.1);
                 this.joint.connectedAnchor.x = o0.blend(this.joint.connectedAnchor.x,data.pos.x,0.1);
                 this.joint.connectedAnchor.y = o0.blend(this.joint.connectedAnchor.y,data.pos.y,0.1);
                 this.joint.apply();
                 //cc.log('sdadsadasdasssssssssssssssss');
             }
          }/** */
    },


    // use this for initialization
    onLoad: function onLoad() {
        this.node.tag = o0Game.Tag.Chainsaw;
        this.node.scaleX = 0.3;
        this.node.scaleY = 0.3;

        this.nameLabel = o0CC.addNode(this.node, 2, cc.Label).getComponent(cc.Label);
        this.nameLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.nameLabel.verticalAlign = cc.Label.VerticalAlign.TOP;
        this.nameLabel.node.color = new cc.Color(255, 255, 255);
        this.nameLabel.node.anchorX = 0;
        this.nameLabel.node.anchorY = 0;
        this.nameLabel.node.x = 0;
        this.nameLabel.node.y = 200;
        this.nameLabel.node.height = 0;
        this.nameLabel.fontSize = 100;
        this.nameLabel.node.anchorX = 0.5;
        this.nameLabel.node.anchorY = 0.5;

        //this.node.rotation = 30;

        o0CC.addSprite(this.node, 'elements/ChainsawSheet');
        this.rigidBody = this.node.addComponent(cc.RigidBody);
        this.rigidBody.enabledContactListener = true;
        this.rigidBody.gravityScale = 0;
        this.rigidBody.fixedRotation = false;
        //this.rigidBody.bullet = true;
        //rigidBody.type = cc.RigidBodyType.Static;
        this.collider = this.node.addComponent(cc.PhysicsBoxCollider);
        this.collider.size = new cc.Size(190, 59);
        this.collider.density = 1; //0就不会旋转角度
        this.collider.sensor = true;
        this.collider.apply();

        //this.joint.connectedBody = this.bodyRigidBody;
        //this.joint.anchor = cc.v2(0,40);
        //this.joint.apply();

    },

    // called every frame
    update: function update(dt) {
        var newLabelString = this.name;
        /*
        if(this.joint == null){//空中
            newLabelString += '; air';
        }else if(this.joint.connectedBody.node.tag == o0Game.Tag.Ground){//插在地上
            newLabelString += '; ground';
        }else if(this.joint.connectedBody.node.tag == o0Game.Tag.Player && this.joint.connectedBody.getComponent('MODCharacter').hand != null){//拿在手上
            newLabelString += '; hand';
        }/** */
        for (var i in this.invinciblePlayer) {
            newLabelString += '; ' + this.invinciblePlayer[i].name;
        }
        if (newLabelString != this.nameLabel.string) {
            this.nameLabel.string = newLabelString;
        }
    },

    updateJoint: function updateJoint(direction) {
        if (this.joint == null) {
            return;
        }

        if (direction > 0) {
            this.joint.connectedAnchor = cc.v2(45, 0);
            this.joint.referenceAngle = 40;
            this.joint.apply();
        } else if (direction < 0) {
            this.joint.connectedAnchor = cc.v2(-45, 0);
            this.joint.referenceAngle = 180 - 40;
            this.joint.apply();
        }
    },
    connectPlayer: function connectPlayer(MODCharacter) {
        if (this.joint != null) {
            if (this.joint.connectedBody.node.tag == o0Game.Tag.player) {
                this.joint.connectedBody.getComponent('MODCharacter').hand = null;
            }
            this.joint.destroy();
            this.joint = null;
        }

        this.invinciblePlayer = [];
        this.invinciblePlayer.push(MODCharacter);

        MODCharacter.hand = this;
        this.joint = this.node.addComponent(cc.WeldJoint);
        this.joint.connectedBody = MODCharacter.getComponent(cc.RigidBody);
        this.joint.apply();
        this.joint.enabled = true;
        this.collider.sensor = false;
        this.collider.apply();
        this.updateJoint(MODCharacter.node.scaleX);
    },
    connectGround: function connectGround(MODMap) {
        if (this.joint != null) {
            if (this.joint.connectedBody.node.tag == o0Game.Tag.player) {
                this.joint.connectedBody.getComponent('MODCharacter').hand = null;
            }
            this.joint.destroy();
            this.joint = null;
        }
        this.joint = this.node.addComponent(cc.WeldJoint);
        this.joint.connectedBody = MODMap.getComponent(cc.RigidBody);
        this.joint.apply();
        this.joint.enabled = true;
        this.collider.sensor = true;
        this.collider.apply();
    },
    disconnect: function disconnect() {
        if (this.joint == null) {
            return;
        }
        if (this.joint.connectedBody.node.tag == o0Game.Tag.Player) {
            this.joint.connectedBody.getComponent('MODCharacter').hand = null;
        }
        this.joint.destroy();
        this.joint = null;
        this.collider.sensor = true;
        this.collider.apply();
    },
    bounceOff: function bounceOff(player, otherChainsaw, otherPlayer, contact) {
        var _this = this;

        if (this.joint == null || this.joint.connectedBody.getComponent('MODCharacter') == null) {
            return;
        }

        var worldManifold = contact.getWorldManifold();
        var point = worldManifold.points[0];
        if (point == undefined) {
            cc.log(this.name + '???');
        } /** */
        this.invinciblePlayer = [];
        if (otherPlayer != null) {
            this.invinciblePlayer.push(otherPlayer);
        }
        if (player != null) {
            this.invinciblePlayer.push(player);
            player.hand = null;
        }
        this.joint.destroy();
        this.joint = null;
        this.collider.sensor = true;
        this.collider.apply();

        this.scheduleOnce(function () {
            var force = cc.v2(_this.node.x - otherChainsaw.node.x, 30).normalizeSelf().mulSelf(2000);
            _this.rigidBody.linearVelocity = force;
            _this.rigidBody.angularVelocity = (Math.random() - 0.5) * 1000;
        }, 0.01);
        if (player != null) {
            this.scheduleOnce(function () {
                var force = cc.v2(_this.node.x - otherChainsaw.node.x, 30).normalizeSelf().mulSelf(500);
                player.rigidBody.linearVelocity = force;
            }, 0.01);
        }

        //var force = v2point.sub(otherPlayerBody.node.position).mulSelf(500);
        //var force = cc.v2(this.node.x - otherChainsaw.node.x,50).normalizeSelf().mulSelf(5000);
        //this.rigidBody.linearVelocity = force;

        //this.rigidBody.angularVelocity+=this.joint.connectedAnchor.x;
        //this.rigidBody.applyLinearImpulse(force,point,true);
    },


    onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        if (this.host == false) {
            return;
        }
        var self = this;

        if (this.joint == null) {
            //空中
            if (otherCollider.node.tag == o0Game.Tag.Player) {
                //撞到玩家
                var player = otherCollider.getComponent('MODCharacter');
                for (var i in this.invinciblePlayer) {
                    if (player == this.invinciblePlayer[i]) {
                        return;
                    }
                }
                //cc.log(1)
                if (otherCollider.getComponent('MODCharacter').hand != null && otherCollider.getComponent('MODCharacter').hand.node.tag == o0Game.Tag.Chainsaw) {
                    otherCollider.getComponent('MODCharacter').hand.bounceOff(null, this, null, contact);
                }
                otherCollider.node.active = false;
            } else if (otherCollider.node.tag == o0Game.Tag.Ground) {
                //撞到地上
                this.joint = this.node.addComponent(cc.WeldJoint);
                this.joint.connectedBody = otherCollider.body;
                //this.joint.connectedAnchor = this.node.position;
                //this.joint.referenceAngle = this.node.rotation;
                this.joint.connectedAnchor = this.node.position;
                this.joint.referenceAngle = -this.node.rotation;
                this.joint.apply();
                this.invinciblePlayer = [];
            }
        } else if (this.joint.connectedBody.node.tag == o0Game.Tag.Ground) {
            //插在地上
            if (otherCollider.node.tag == o0Game.Tag.Player && otherCollider.node.getComponent('MODCharacter').hand == null) {
                //撞到玩家，并且玩家空手
                this.connectPlayer(otherCollider.node.getComponent('MODCharacter'));
            }
        } else if (this.joint.connectedBody.node.tag == o0Game.Tag.Player && this.joint.connectedBody.getComponent('MODCharacter').hand != null) {
            //拿在手上
            if (otherCollider.body.node.tag == o0Game.Tag.Player) {
                //撞到玩家
                var player = otherCollider.getComponent('MODCharacter');
                for (var i in this.invinciblePlayer) {
                    if (player == this.invinciblePlayer[i]) {
                        return;
                    }
                }
                //cc.log(2)
                if (otherCollider.getComponent('MODCharacter').hand != null && otherCollider.getComponent('MODCharacter').hand.node.tag == o0Game.Tag.Chainsaw) {
                    otherCollider.getComponent('MODCharacter').hand.bounceOff(null, this, this.joint.connectedBody.getComponent('MODCharacter'), contact);
                }
                otherCollider.node.active = false;
            } else if (otherCollider.node.tag == o0Game.Tag.Chainsaw && otherCollider.getComponent('MODChainsaw').joint != null && otherCollider.getComponent('MODChainsaw').joint.connectedBody.getComponent('MODCharacter') != null) {
                //撞到电锯，并且电锯被拿着                
                cc.log(this.name);
                var chainsawA = selfCollider.getComponent('MODChainsaw');
                var playerA = chainsawA.joint.connectedBody.getComponent('MODCharacter');
                var chainsawB = otherCollider.getComponent('MODChainsaw');
                var playerB = chainsawB.joint.connectedBody.getComponent('MODCharacter');
                chainsawA.bounceOff(playerA, chainsawB, playerB, contact);
                chainsawB.bounceOff(playerB, chainsawA, playerA, contact);
            }
        }
    } /** */
});

cc._RF.pop();
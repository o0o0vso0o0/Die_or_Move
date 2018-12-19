"use strict";
cc._RF.push(module, '7ab63PkGoBAZZ7Dd7fyy3b7', 'o0CCButton');
// Script/o0Lib/o0CCButton.js

'use strict';

var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Sprite,
    properties: {
        //background:null,
        button: null,
        sprite: null,
        label: null,
        o0ClickEvent: []
    },

    o0OnClick: function o0OnClick() {
        for (var i = 0; i < this.o0ClickEvent.length; ++i) {
            this.o0ClickEvent[i]();
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.sprite = this; //精灵必须在button之前
        var self = this;
        cc.loader.loadRes('button', cc.SpriteFrame, function (err, spriteFrame) {
            self.sprite.spriteFrame = spriteFrame;
        }); /** */
        this.sprite.trim = true;
        this.sprite.type = cc.Sprite.Type.SLICED;
        this.sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        //this.sprite.SrcBlendFactor = cc.BlendFactor.SRC_ALPHA;
        //this.sprite.DstBlendFactor = cc.BlendFactor.ONE_MINUS_SRC_ALPHA;


        this.button = this.node.addComponent('cc.Button');
        //this.button = this;
        this.button.target = this.node;
        this.button.interactable = true;
        this.button.duration = 0.1;
        this.button.transition = cc.Button.Transition.COLOR;
        this.button.normalColor = new cc.Color(200, 200, 200, 255);
        this.button.pressedColor = new cc.Color(100, 100, 100, 255);
        this.button.hoverColor = new cc.Color(150, 150, 150, 255);
        this.button.disabledColor = new cc.Color(50, 50, 50, 255); /** */

        var o0OnClickHandler = new cc.Component.EventHandler();
        o0OnClickHandler.target = this.node;
        o0OnClickHandler.component = "o0CCButton";
        o0OnClickHandler.handler = "o0OnClick";
        o0OnClickHandler.emit([]);
        this.button.clickEvents.push(o0OnClickHandler);

        this.label = o0CC.addNode(this.node, 0, 'cc.Label').getComponent('cc.Label');
        this.label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.label.verticalAlign = cc.Label.VerticalAlign.CENTER;
        //this.label.fontSize = 16;
        //this.label.lineHeight = 20;
        this.label.overflow = cc.Label.Overflow.SHRINK;
        this.label.node.color = new cc.Color(0, 0, 0);
        this.label.enableWrapText = false; /** */
    },
    // called every frame
    update: function update(dt) {

        this.label.node.anchorX = this.node.anchorX;
        this.label.node.anchorY = this.node.anchorY;
        this.label.node.x = 0;
        this.label.node.y = 0;
        this.label.node.width = this.node.width - 5;
        this.label.node.height = this.node.height;
        this.label.fontSize = this.node.height - 15;
        this.label.string = this.name; /** */
    }
});

cc._RF.pop();
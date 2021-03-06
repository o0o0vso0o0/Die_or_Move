(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/o0Lib/o0CC.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ef7dcYGobxPGbkGDp7Uo9+T', 'o0CC', __filename);
// Script/o0Lib/o0CC.js

'use strict';

var o0 = require('o0');

module.exports = {
    /*
    destroyNode: function(node) {
        node.active = false;
        var components = node.getComponents();
        for(var i = 0;i<components.length;++i){
            components[i].destroy();
        }
        node.destroy();
    },/* */
    log: function log(string) {
        cc.log('o0: ' + string);
    },
    addNode: function addNode(parentNode) {
        var zIndex;
        switch (arguments.length) {
            case 0:
            case 1:
                zIndex = 0;
                break;
            default:
                zIndex = arguments[1];
                break;
        }
        var node = new cc.Node();
        for (var i = 2; i < arguments.length; ++i) {
            node.addComponent(arguments[i]);
        }
        node.parent = parentNode;
        node.zIndex = zIndex;
        return node;
    },
    addSpriteNode: function addSpriteNode(parentNode, imageNameInResourceFile) {
        var zIndex;
        switch (arguments.length) {
            default:
            case 2:
                zIndex = 0;
                break;
            case 3:
                zIndex = arguments[2];
                break;
        }
        var node = new cc.Node();
        node.parent = parentNode;
        node.zIndex = zIndex;
        var sprite = node.addComponent(cc.Sprite);
        cc.loader.loadRes(imageNameInResourceFile, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
        return sprite;
    },
    addSprite: function addSprite(node, imageNameInResourceFile) {
        var sprite = node.addComponent(cc.Sprite);
        cc.loader.loadRes(imageNameInResourceFile, cc.SpriteFrame, function (err, spriteFrame) {
            sprite.spriteFrame = spriteFrame;
        });
        return sprite;
    },
    addGraphicNode: function addGraphicNode(parentNode) {
        var zIndex;
        switch (arguments.length) {
            default:
            case 1:
                zIndex = 0;
                break;
            case 2:
                zIndex = arguments[1];
                break;
        }
        var node = new cc.Node();
        parentNode.addChild(node, zIndex);
        var component = node.addComponent(cc.Graphics);
        return component;
    },
    rotationFromVector: function rotationFromVector(modVector) {
        //rotation between 0-360 
        var rotation = modVector.angle(new o0.Vector2(1, 0));
        if (modVector.y > 0) rotation = 360 - rotation;
        return rotation;
    },
    vectorFromRotation: function vectorFromRotation(rotation) {
        //rotation between 0-360 
        var radian = rotation / 180 * Math.PI;
        if (rotation < 90) return new o0.Vector2(Math.cos(radian), -Math.sin(radian));
        if (rotation < 180) {
            radian = Math.PI - radian;
            return new o0.Vector2(-Math.cos(radian), -Math.sin(radian));
        }
        if (rotation < 270) {
            radian -= Math.PI;
            return new o0.Vector2(-Math.cos(radian), Math.sin(radian));
        }
        radian = Math.PI * 2 - radian; /**/
        return new o0.Vector2(Math.cos(radian), Math.sin(radian));
    },
    nextRotation: function nextRotation(currentRotation, targetRotation, turningSpeed) {
        //rotation between 0-360 
        var rotationDifference = currentRotation - targetRotation;
        if (Math.abs(rotationDifference) <= turningSpeed || Math.abs(rotationDifference + 360) <= turningSpeed || Math.abs(rotationDifference - 360) <= turningSpeed) currentRotation = targetRotation;else if (rotationDifference > 0 && rotationDifference < 180 || rotationDifference > -360 && rotationDifference < -180) currentRotation -= turningSpeed;else currentRotation += turningSpeed;
        if (currentRotation >= 360) currentRotation -= 360;
        if (currentRotation < 0) currentRotation += 360;
        return currentRotation;
    },
    setGroup: function setGroup(component, groupIndex) {
        if (component.node.groupIndex == groupIndex) {
            return;
        }
        component.node.active = false;
        component.scheduleOnce(function () {
            if (component != null && component.node != null) {
                component.node.groupIndex = groupIndex;
                component.node.active = true;
            }
        }, 0.1); /*用来解决cocos动态改变group的bug */
    },
    randomBrightColor: function randomBrightColor() {
        var c = new cc.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        var rate = 255.0 / Math.max(c.getR(), c.getG(), c.getB(), c.getA());
        return new cc.Color(c.getR() * rate, c.getG() * rate, c.getB() * rate, 255);
    }

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
        //# sourceMappingURL=o0CC.js.map
        
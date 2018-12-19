var o0 = require('o0');
var o0CC = require('o0CC');


cc.Class({
    extends: cc.Component,
    properties: {
        player:null,

        keyDirection:null,
        key:null,
        jumpingKey:null,
    },
    onLoad: function () {        
        if(this.player == null){
            this.player = this.node.getComponent('MODCharacter');
            if(this.player == null){
                o0CC.log('player null')
            }
        }



        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.keyDirection = new Array();
        this.keyDirection[cc.KEY.right] = 1;
        this.keyDirection[cc.KEY.left] = -1;
        this.keyDirection[cc.KEY.d] = 1;
        this.keyDirection[cc.KEY.a] = -1;
        this.key = new Array();
        this.jumpingKey = new Array();
        this.jumpingKey.push(cc.KEY.up);
        this.jumpingKey.push(cc.KEY.w);
    },
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    updateMotionState: function (dt) {
        var targetVector = 0;
        for(var _key in this.keyDirection){
            if(this.key[_key] == true){
                targetVector += this.keyDirection[_key];
            }
        }
        this.player.setMotionState(targetVector);
    },

    onKeyDown: function (event) {
        if(this.keyDirection[event.keyCode] != null){
            this.key[event.keyCode] = true;
            this.updateMotionState();
        }
        for(var _key in this.jumpingKey){
            if(event.keyCode == this.jumpingKey[_key]){
                this.player.jump();
                break;
            }
        }
    },
    onKeyUp: function (event) {
        if(this.keyDirection[event.keyCode] != null){
            this.key[event.keyCode] = false;
            this.updateMotionState();
        }
    }
});
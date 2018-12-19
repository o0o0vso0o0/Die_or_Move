var o0 = require('o0');
var o0CC = require('o0CC');


cc.Class({
    extends: cc.Component,
    properties: {
        player:null,//被控制的角色

        map:null,
        players:null,//所有角色，包括自身
        chainsaws:null,
    },
    onLoad: function () {        
        if(this.player == null){
            this.player = this.node.getComponent('MODCharacter');
            if(this.player == null){
                o0CC.log('player null')
            }
        }
    },
    start(){
        cc.log('AI: '+this.players[this.player.name].name);
        cc.log('Map: '+this.map);
        cc.log('Chainsaws: '+this.chainsaws);
    },
    update(){
        //this.player.setMotionState(-1);
        //this.player.setMotionState(0);
        //this.player.setMotionState(1);
        //this.player.jump();
    },
    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
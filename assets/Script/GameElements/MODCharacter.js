
var o0 = require('o0');
var o0CC = require('o0CC');
var o0Game = require('o0Game');

cc.Class({
    extends: cc.Component,

    properties: {
        feet:null,
        motionState:0,

        //body:null,
        rigidBody:null,

        leftLeg: null,
        rightLeg: null,

        hand:null,

        nameLabel:null,

        onSendingInput:null,
    },
    updateDirection(motionState){
        if(motionState>0){
            this.node.scaleX = 0.3;
            this.nameLabel.node.scaleX = 1;
        }else if(motionState<0){
            this.node.scaleX = -0.3;
            this.nameLabel.node.scaleX = -1;
        }

        if(this.hand !=null){
            this.hand.updateJoint(this.node.scaleX);
        }
    },
    setMotionState:function(motionState){
        if(this.node.active == false){
            return;
        }

        if(motionState>0){
            this.motionState = 1;
        }else if(motionState<0){
            this.motionState = -1;
        }else{
            this.motionState = 0;
        }
        
        if(this.onSendingInput!=null){
            this.onSendingInput({'motion':this.motionState});
        }

        this.updateDirection(motionState);
    },
    jump:function(){
        if(this.node.active == false){
            return;
        }

        if(this.onSendingInput!=null){
            this.onSendingInput({'jump':true});
        }

        if(this.feet.standing > 0){
            this.rigidBody.linearVelocity = cc.v2(this.rigidBody.linearVelocity.x,2000);
        }/** */
    },
    receivingInput(data){
        if(this.onSendingInput!=null){
            return;
        }
        if(data['motion']!=null){
            this.setMotionState(data['motion']);
        }
        if(data['jump']!=null){
            this.jump();
        }
    },
    toData(){
        if(this.node.active == false){
            return {'active':false};
        }else{
            return {'active':true,
                'dir':this.node.scaleX>0,
                'pos':this.node.position,
                'vel':this.rigidBody.linearVelocity};
        }
    },
    syncData(data){
        if(data.active == false){
            this.node.active = false;
        }else{
            this.node.x = o0.blend(this.node.x,data.pos.x,0.3);
            this.node.y = o0.blend(this.node.y,data.pos.y,0.3);
            this.rigidBody.linearVelocity.x = o0.blend(this.rigidBody.linearVelocity.x,data.vel.x,0.5);
            this.rigidBody.linearVelocity.y = o0.blend(this.rigidBody.linearVelocity.y,data.vel.y,0.5);
        }
    },

    // use this for initialization
    onLoad: function () {
        //o0CC.log('sdaada');
        //this.body = o0CC.addNode(this.node,1)
        this.node.tag = o0Game.Tag.Player;
        this.node.scaleX = 0.3;
        this.node.scaleY = 0.3;

        this.nameLabel = o0CC.addNode(this.node,2,cc.Label).getComponent(cc.Label);
        this.nameLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        this.nameLabel.verticalAlign = cc.Label.VerticalAlign.TOP;
        this.nameLabel.node.color = new cc.Color(255,255,255);
        this.nameLabel.node.anchorX = 0;
        this.nameLabel.node.anchorY = 0;
        this.nameLabel.node.x = 0;
        this.nameLabel.node.y = 200;
        this.nameLabel.node.height = 0;
        this.nameLabel.fontSize = 100;
        this.nameLabel.node.anchorX = 0.5;
        this.nameLabel.node.anchorY = 0.5;

        o0CC.addSprite(this.node,'elements/Body');
        this.rigidBody = this.node.addComponent(cc.RigidBody);
        //this.rigidBody.type = cc.RigidBodyType.Animated;
        this.rigidBody.fixedRotation = true;
        //this.bodyRigidBody.linearDamping =  0;
        //this.rigidBody.enabledContactListener = true;
        

        var collider = this.node.addComponent(cc.PhysicsPolygonCollider);
        collider.points = [cc.v2(30,97),
            cc.v2(60,87),
            cc.v2(80,70),
            cc.v2(90,55),
            cc.v2(95,30),
            cc.v2(100,-10),
            cc.v2(120,-51),
            cc.v2(117,-70),
            cc.v2(110,-77),
            cc.v2(95,-79),
            cc.v2(84,-94),
            cc.v2(68,-100),
            cc.v2(56,-100),
            cc.v2(47,-127),
            cc.v2(31,-131),
            cc.v2(15,-127),
            cc.v2(6,-100),
            cc.v2(-6,-100),
            cc.v2(-15,-127),
            cc.v2(-31,-131),
            cc.v2(-47,-127),
            cc.v2(-56,-100),
            cc.v2(-68,-100),
            cc.v2(-84,-94),
            cc.v2(-95,-79),
            cc.v2(-110,-77),
            cc.v2(-117,-70),
            cc.v2(-120,-51),
            cc.v2(-100,-10),
            cc.v2(-95,30),
            cc.v2(-90,55),
            cc.v2(-80,70),
            cc.v2(-60,87),
            cc.v2(-30,97),
            cc.v2(0,100)];
        collider.friction = 0.6;
        collider.apply();
        //o0CC.addSpriteNode(null,'maps/BG');

        this.feet = o0CC.addNode(this.node,0,'MODCharacterFeet').getComponent('MODCharacterFeet');
        var joint = this.feet.node.addComponent(cc.WeldJoint);
        joint.connectedBody = this.rigidBody;
        //joint.connectedBody = null;
        joint.anchor = cc.v2(0,40);
        joint.apply();/** */
        
        this.leftLeg = o0CC.addSpriteNode(this.node,'elements/LegSmall',0).node;
        //o0CC.setGroup(this.leftLeg.getComponent('MODCharacterLeg'),this.node.groupIndex);
        this.leftLeg.setPosition(cc.v2(-31,-111));
        this.rightLeg = o0CC.addSpriteNode(this.node,'elements/LegSmall',0).node;
        //o0CC.setGroup(this.rightLeg.getComponent('MODCharacterLeg'),this.node.groupIndex);
        this.rightLeg.setPosition(cc.v2(31,-111));
    },

    // called every frame
    update: function (dt) {
        var x = this.rigidBody.linearVelocity.x;
        var y = this.rigidBody.linearVelocity.y;
        if(this.feet.standing > 0){
            x += this.motionState*100;
        }else{
            x += this.motionState*50;
        }
        if(x > 600){
            x = 600;
        }else if(x < -600){
            x = -600;
        }
        this.rigidBody.linearVelocity = cc.v2(x,y);/** */

        
        var newLabelString = this.name;
        if(this.hand!=null){
            newLabelString += '; ' +this.hand.name;
        }
        if(newLabelString != this.nameLabel.string){
            this.nameLabel.string = newLabelString;
        }
    },
});



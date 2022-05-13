import { _decorator, Component, RigidBody, PhysicsSystem, director } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Ball
 * DateTime = Tue May 10 2022 17:13:34 GMT+0900 (日本標準時)
 * Author = taqanori
 * FileBasename = Ball.ts
 * FileBasenameNoExtension = Ball
 * URL = db://assets/src/Ball.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass("Ball")
export class Ball extends Component {
  start() {
    // const rb = this.node.getComponent(RigidBody);
    // rb.setLinearVelocity(new math.Vec3(1, 0, 2));
    // PhysicsSystem.instance.enable = false;
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */

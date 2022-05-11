import {
  _decorator,
  Component,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  quat,
} from "cc";
const { ccclass } = _decorator;

/**
 * Predefined variables
 * Name = Tray
 * DateTime = Tue May 10 2022 12:33:55 GMT+0900 (日本標準時)
 * Author = taqanori
 * FileBasename = Tray.ts
 * FileBasenameNoExtension = Tray
 * URL = db://assets/src/Tray.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

type ArrowKeyDirection = 0 | 1 | -1;
const rotationRatio = 1;
const maxRotation = 0.125;
const maxInitialRotation = 0.125;

@ccclass("Tray")
export class Tray extends Component {
  private xArrowKeyDirection: ArrowKeyDirection = 0;
  private zArrowKeyDirection: ArrowKeyDirection = 0;

  start() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    this.rotate(this.randomRotation(), this.randomRotation());
  }

  private randomRotation(): number {
    return -maxInitialRotation + Math.random() * 2 * maxInitialRotation;
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  private onKeyDown(e: EventKeyboard) {
    switch (e.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.zArrowKeyDirection = 1;
        break;
      case KeyCode.ARROW_RIGHT:
        this.zArrowKeyDirection = -1;
        break;
      case KeyCode.ARROW_DOWN:
        this.xArrowKeyDirection = 1;
        break;
      case KeyCode.ARROW_UP:
        this.xArrowKeyDirection = -1;
        break;
    }
  }

  private onKeyUp(e: EventKeyboard) {
    switch (e.keyCode) {
      case KeyCode.ARROW_LEFT:
        if (this.zArrowKeyDirection == 1) {
          this.zArrowKeyDirection = 0;
        }
        break;
      case KeyCode.ARROW_RIGHT:
        if (this.zArrowKeyDirection == -1) {
          this.zArrowKeyDirection = 0;
        }
        break;
      case KeyCode.ARROW_DOWN:
        if (this.xArrowKeyDirection == 1) {
          this.xArrowKeyDirection = 0;
        }
        break;
      case KeyCode.ARROW_UP:
        if (this.xArrowKeyDirection == -1) {
          this.xArrowKeyDirection = 0;
        }
        break;
    }
  }

  update(deltaTime: number) {
    this.rotate(
      this.xArrowKeyDirection * rotationRatio * deltaTime,
      this.zArrowKeyDirection * rotationRatio * deltaTime
    );
  }

  private rotate(x: number, z: number): void {
    this.node.rotate(quat(x, 0, z));
    const rotation = this.node.getRotation();
  }

  /** Rotating this way somehow changes the tray shape... */
  // update(deltaTime: number) {
  //   const rotation = this.node.getRotation();
  //   this.setRotation(
  //     rotation.x + this.xArrowKeyDirection * rotationRatio * deltaTime,
  //     rotation.z + this.zArrowKeyDirection * rotationRatio * deltaTime
  //   );
  // }
  private setRotation(x: number, z: number): void {
    const rotation = this.node.getRotation();
    rotation.set(this.trimRotation(x), rotation.y, this.trimRotation(z));
    this.node.setRotation(rotation);
  }

  private trimRotation(n: number): number {
    return (n / Math.abs(n)) * Math.min(maxRotation, Math.abs(n));
  }
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

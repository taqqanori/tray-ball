import {
  _decorator,
  Component,
  PhysicsSystem,
  input,
  Input,
  EventKeyboard,
  RichText,
  sys,
  director,
} from "cc";
import { Ball } from "./Ball";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Main
 * DateTime = Wed May 11 2022 14:47:14 GMT+0900 (日本標準時)
 * Author = taqanori
 * FileBasename = Main.ts
 * FileBasenameNoExtension = Main
 * URL = db://assets/src/Main.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

const bestScoreKey = "TRAY_BALL_BEST_SCORE";
const ballYThreshold = -10;

@ccclass("Main")
export class Main extends Component {
  @property(RichText)
  messageComponent: RichText;
  @property(RichText)
  scoreComponent: RichText;
  @property(RichText)
  bestScoreComponent: RichText;
  @property(Ball)
  ballComponent: Ball;
  private started: boolean;
  private score: number;
  private bestScore: number;
  start() {
    PhysicsSystem.instance.enable = false;
    this.started = false;
    this.score = 0;
    this.bestScore = 0;
    const bestScoreStr = sys.localStorage.getItem(bestScoreKey);
    if (bestScoreStr != null) {
      this.bestScore = parseFloat(bestScoreStr);
    }
    this.updateScore();
    this.updateBestScore();
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  update(deltaTime: number) {
    if (!this.started) {
      return;
    }
    this.score += deltaTime;
    this.updateScore();
    if (this.bestScore < this.score) {
      this.bestScore = this.score;
      this.updateBestScore();
    }
    if (this.ballComponent.node.position.y < ballYThreshold) {
      sys.localStorage.setItem(bestScoreKey, this.bestScore.toString());
      director.loadScene("main");
    }
  }

  private onKeyDown(e: EventKeyboard) {
    this.messageComponent.enabled = false;
    PhysicsSystem.instance.enable = true;
    this.started = true;
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  private updateScore(): void {
    this.setScore("Score", this.score, this.scoreComponent);
  }

  private updateBestScore(): void {
    this.setScore("Best Score", this.bestScore, this.bestScoreComponent);
  }

  private setScore(header: string, score: number, component: RichText): void {
    component.string = `${header}: ${score.toFixed(2)}`;
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

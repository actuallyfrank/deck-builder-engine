import { Application, Sprite } from "pixi.js";
import { SceneItem } from "./types";
import { Log } from "./utils";

const logger = Log.getInstance();

export interface EngineOptions {
  debugMode?: boolean;
}

export class Engine {
  private app: Application;
  private isRunning: boolean = false;

  constructor({ debugMode = false }: EngineOptions = {}) {
    if (debugMode) {
      logger.enableDebug(true);
    }
    this.app = new Application();
  }

  async init(resizeTo: HTMLElement | Window): Promise<void> {
    await this.app.init({ resizeTo, autoStart: false });
  }

  getCanvas() {
    return this.app.canvas;
  }

  start() {
    if (this.isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    this.isRunning = true;

    const frame = () => {
      if (!this.isRunning) {
        return;
      }

      this.render();
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  stop() {
    this.isRunning = false;
  }

  updateScene(sceneItems: SceneItem[]) {
    sceneItems.forEach((item) => {
      let itemInScene = this.app.stage.children.find(
        (child) => child.label === item.id,
      );
      if (!itemInScene) {
        const sprite = Sprite.from("sample.png");
        sprite.label = item.id;
        itemInScene = this.app.stage.addChild(sprite);

        logger.debug("add item to scene", itemInScene);
        return;
      }

      itemInScene.position.set(
        item.transform.position.x,
        item.transform.position.y,
      );
      itemInScene.scale.set(item.transform.scale.x, item.transform.scale.y);

      itemInScene.angle = item.transform.angle;
    });

    this.render();
  }

  render() {
    logger.debug("render");
    this.app.render();
  }
}

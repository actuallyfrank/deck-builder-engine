import { Application, Sprite } from "pixi.js";
import { SceneItem, ScriptComponent } from "./types";
import { Log } from "./utils";

const logger = Log.getInstance();

export interface EngineOptions {
  debugMode?: boolean;
}

export class Engine {
  private app: Application;
  private isRunning: boolean = false;

  private sceneItems: SceneItem[] = [];

  private lastTime: number | undefined = undefined;

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

  start(sceneItems: SceneItem[]) {
    if (this.isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    this.sceneItems = sceneItems;
    this.initializeComponents(sceneItems);

    this.isRunning = true;

    const frame = (timestamp: number) => {
      if (!this.isRunning) {
        return;
      }

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = timestamp - this.lastTime;
      this.updateComponents(deltaTime);
      this.lastTime = timestamp;

      this.updateScene(this.sceneItems);

      this.render();
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  stop() {
    this.isRunning = false;
    this.lastTime = undefined;

    this.sceneItems = [];
  }

  private initializeComponents(sceneItems: SceneItem[]) {
    sceneItems.forEach((item) => {
      item.components.forEach((component) => {
        component.sceneItem = item;

        const scriptComponent = component as ScriptComponent;

        if (scriptComponent.onStart) {
          scriptComponent.onStart();
        }
      });
    });
  }

  private updateComponents(deltaTime: number) {
    this.sceneItems.forEach((item) => {
      item.components.forEach((component) => {
        const scriptComponent = component as ScriptComponent;

        if (scriptComponent.onUpdate) {
          scriptComponent.onUpdate(deltaTime);
        }
      });
    });
  }

  updateScene(sceneItems: SceneItem[]) {
    sceneItems.forEach((item) => {
      let itemInScene = this.app.stage.children.find(
        (child) => child.label === item.id,
      );
      if (!itemInScene) {
        const sprite = Sprite.from("sample.png");
        sprite.label = item.id;
        sprite.anchor.set(0.5);
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

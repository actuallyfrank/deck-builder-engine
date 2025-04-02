import { Application, ContainerChild, Sprite } from "pixi.js";
import { SceneItem, ScriptComponent, Transform } from "./types";
import { Log } from "./utils/logger";
import { initializeComponents, updateComponents } from "./utils/components";

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
    initializeComponents(sceneItems);

    this.isRunning = true;

    const frame = (timestamp: number) => {
      if (!this.isRunning) {
        return;
      }

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = timestamp - this.lastTime;
      updateComponents(this.sceneItems, deltaTime);
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

  updateScene(sceneItems: SceneItem[]) {
    sceneItems.forEach((item) => {
      let containerInscene = this.app.stage.children.find(
        (child) => child.label === item.id,
      );
      if (!containerInscene) {
        const sprite = this.createSprite(item);
        containerInscene = this.app.stage.addChild(sprite);

        logger.debug("add item to scene", containerInscene);
        return;
      }

      this.updateContainerTransform(containerInscene, item.transform);
    });

    this.render();
  }

  createSprite(item: SceneItem) {
    const sprite = Sprite.from("sample.png");
    sprite.label = item.id;
    sprite.anchor.set(0.5);

    return sprite;
  }

  updateContainerTransform(container: ContainerChild, transform: Transform) {
    container.position.set(transform.position.x, transform.position.y);
    container.scale.set(transform.scale.x, transform.scale.y);

    container.angle = transform.angle;
  }

  render() {
    logger.debug("render");
    this.app.render();
  }
}

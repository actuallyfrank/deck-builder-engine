import { Sprite } from "pixi.js";
import { Scene, SceneItem } from "./types";
import { Log } from "./utils/logger";
import { initializeComponents, updateComponents } from "./utils/components";
import { createSceneNode, updateContainerTransform } from "./utils/scene-items";

import copy from "fast-copy";

import { PixiApp } from "./app";

const logger = Log.getInstance();

export interface EngineOptions {
  debugMode?: boolean;
}

export class Engine {
  private pixiApp: PixiApp;
  private isRunning: boolean = false;

  private sceneItems: SceneItem[] = [];

  private lastTime: number | undefined = undefined;

  constructor({ debugMode = false }: EngineOptions = {}) {
    if (debugMode) {
      logger.enableDebug(true);
    }
    this.pixiApp = new PixiApp();
  }

  async init(resizeTo: HTMLElement | Window): Promise<void> {
    await this.pixiApp.init(resizeTo);
  }

  getCanvas() {
    return this.pixiApp.getCanvas();
  }

  start(scene: Scene) {
    const sceneCopy = copy(scene);
    if (this.isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    this.sceneItems = sceneCopy.items;
    initializeComponents(sceneCopy.items);

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

      this.updateScene(sceneCopy);

      this.render();
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  stop(sceneToResetTo?: Scene) {
    this.isRunning = false;
    this.lastTime = undefined;

    this.sceneItems = [];

    if (sceneToResetTo) {
      this.updateScene(sceneToResetTo);
    }
  }

  updateScene(scene: Scene) {
    scene.items.forEach((item) => {
      const containerInscene = this.pixiApp.findChildById(item.id);

      if (!containerInscene) {
        this.pixiApp.addChild(createSceneNode(item));

        logger.debug("add item to scene", containerInscene);
        return;
      }

      updateContainerTransform(containerInscene, item.transform);
    });

    this.render();
  }

  createSprite(item: SceneItem) {
    const sprite = Sprite.from("sample.png");
    sprite.label = item.id;
    sprite.anchor.set(0.5);

    return sprite;
  }

  render() {
    logger.debug("render");
    this.pixiApp.render();
  }
}

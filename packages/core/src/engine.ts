import { Scene, SceneItem } from "./types";
import { Log } from "./utils/logger";
import { initializeSceneItem, updateComponents } from "./utils/components";
import { createSceneNode, updateContainerTransform } from "./utils/scene-items";

import { Input } from "./input";

import copy from "fast-copy";

import { PixiApp } from "./app";

const logger = Log.getInstance();

export interface EngineOptions {
  debugMode?: boolean;
}

export class Engine {
  private pixiApp: PixiApp;
  private isRunning: boolean = false;

  private sceneCopy: Scene = {
    items: [],
  };

  private lastTime: number | undefined = undefined;

  constructor({ debugMode = false }: EngineOptions = {}) {
    if (debugMode) {
      logger.enableDebug(true);
    }
    this.pixiApp = new PixiApp();
  }

  async init(resizeTo: HTMLElement | Window): Promise<void> {
    await this.pixiApp.init(resizeTo);
    Input.init(this.getCanvas());
  }

  getCanvas() {
    return this.pixiApp.getCanvas();
  }

  start(scene: Scene) {
    this.sceneCopy = copy(scene);
    if (this.isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    this.pixiApp.reset();

    this.isRunning = true;

    const frame = (timestamp: number) => {
      if (!this.isRunning) {
        return;
      }

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = timestamp - this.lastTime;
      updateComponents(this.sceneCopy.items, deltaTime);
      this.lastTime = timestamp;

      this.updateScene(this.sceneCopy);

      this.render();
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  stop(sceneToResetTo?: Scene) {
    this.isRunning = false;
    this.lastTime = undefined;

    this.sceneCopy = {
      items: [],
    };

    if (sceneToResetTo) {
      this.updateScene(sceneToResetTo);
    }
  }

  initialize(sceneItem: SceneItem) {
    logger.debug("Initializing new object", sceneItem);

    this.sceneCopy.items.push(sceneItem);

    initializeSceneItem(this, sceneItem);

    const container = this.pixiApp.addChild(createSceneNode(sceneItem));

    sceneItem.components.forEach((component) => {
      component.init(sceneItem, container);
    });

    logger.debug("add item to scene", container);
  }

  updateScene(scene: Scene) {
    scene.items.forEach((item) => {
      const containerInscene = this.pixiApp.findChildById(item.id);

      if (!containerInscene) {
        this.initialize(item);
        return;
      }

      updateContainerTransform(containerInscene, item.transform);
    });

    this.render();
  }

  render() {
    this.pixiApp.render();
  }
}

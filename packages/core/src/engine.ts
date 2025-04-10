import { Scene, SceneNode } from "./types";
import { Log } from "./utils/logger";
import {
  initComponents,
  startComponents,
  updateComponents,
} from "./utils/components";
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
  public get isRunning() {
    return this._isRunning;
  }
  private _isRunning: boolean = false;

  private sceneCopy: Scene = {
    nodes: [],
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

  start({ scene, onStart }: { scene: Scene; onStart?: () => void }) {
    if (this._isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    this.sceneCopy = copy(scene);
    this.pixiApp.reset();

    this._isRunning = true;

    this.startUpdateLoop(this.sceneCopy);

    onStart?.();
  }

  startUpdateLoop(scene: Scene) {
    let startTime = 0;
    let frames = 0;

    const frame = (timestamp: number) => {
      if (!this._isRunning) {
        return;
      }

      if (!this.lastTime) {
        this.lastTime = timestamp;
      }

      const deltaTime = timestamp - this.lastTime;
      updateComponents(scene.nodes, deltaTime);
      this.lastTime = timestamp;

      this.updateScene(scene);

      this.render();

      startTime += deltaTime;
      frames++;

      if (startTime >= 1000) {
        logger.debug("FPS", frames);

        startTime = 0;
        frames = 0;
      }
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  stop({
    sceneToResetTo,
    onStop,
  }: {
    sceneToResetTo?: Scene;
    onStop?: () => void;
  }) {
    this._isRunning = false;
    this.lastTime = undefined;

    this.pixiApp.reset();

    if (sceneToResetTo) {
      this.updateScene(sceneToResetTo);
    }

    this.render();

    onStop?.();
  }

  initialize(sceneNode: SceneNode) {
    logger.debug("Initializing new object", sceneNode);

    this.sceneCopy.nodes.push(sceneNode);

    const container = this.pixiApp.addChild(createSceneNode(sceneNode));

    initComponents(this, sceneNode, container);

    startComponents(sceneNode);

    logger.debug("add node to scene", container);
  }

  destroy(sceneNode: SceneNode) {
    const containerInscene = this.pixiApp.findChildById(sceneNode.id);
    if (!containerInscene) {
      logger.error("Container not found in scene", sceneNode.id);
      return;
    }

    this.sceneCopy.nodes = this.sceneCopy.nodes.filter(
      (scene) => scene.id !== sceneNode.id,
    );

    this.pixiApp.destroyChild(containerInscene);

    sceneNode.components.forEach((component) => {
      component.onDestroy?.();
    });

    logger.debug("destroy node from scene", containerInscene);
  }

  updateScene(scene: Scene) {
    scene.nodes.forEach((node) => {
      const containerInscene = this.pixiApp.findChildById(node.id);

      if (!containerInscene) {
        logger.debug("Container not found in scene, initializing", node.id);
        this.initialize(node);
        return;
      }

      updateContainerTransform(containerInscene, node.transform);
    });

    this.render();
  }

  render() {
    this.pixiApp.render();
  }
}

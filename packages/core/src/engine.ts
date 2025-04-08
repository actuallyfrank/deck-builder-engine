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
  private isRunning: boolean = false;

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
    if (this.isRunning) {
      logger.warn("Engine is already running");
      return;
    }

    console.log("copy", scene);

    this.sceneCopy = copy(scene);
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
      updateComponents(this.sceneCopy.nodes, deltaTime);
      this.lastTime = timestamp;

      this.updateScene(this.sceneCopy);

      this.render();
      requestAnimationFrame(frame);
    };

    onStart?.();
    requestAnimationFrame(frame);
  }

  stop({
    sceneToResetTo,
    onStop,
  }: {
    sceneToResetTo?: Scene;
    onStop?: () => void;
  }) {
    this.isRunning = false;
    this.lastTime = undefined;

    this.pixiApp.reset();
    this.render();

    if (sceneToResetTo) {
      this.updateScene(sceneToResetTo);
    }

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

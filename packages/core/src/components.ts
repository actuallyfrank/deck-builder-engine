import { Container } from "pixi.js";
import { Engine, PIXI } from "..";
import { Component, SceneNode } from "./types";
import { createSprite } from "./utils/scene-items";
import { Log } from "./utils/logger";

const logger = Log.getInstance();

export abstract class BaseComponent implements Component {
  init(sceneItem: SceneNode, container: Container): void {}
  sceneNode?: SceneNode;
  engine?: Engine;

  destroy(): void {
    if (!this.sceneNode || !this.engine) {
      logger.warn("Component not initialized");
      return;
    }

    this.engine.destroy(this.sceneNode);
  }

  destroyComponent(): void {
    if (!this.sceneNode || !this.engine) {
      logger.warn("Component not initialized");
      return;
    }
  }

  initialize(sceneItem: SceneNode): void {
    if (!this.sceneNode || !this.engine) {
      logger.warn("Component not initialized");
      return;
    }

    this.engine.initialize(sceneItem);
  }
}

export class TextureComponent extends BaseComponent implements Component {
  texture: string;

  constructor(texture: string) {
    super();
    this.texture = texture;
  }

  init(sceneItem: SceneNode, container: Container): void {
    this.load(sceneItem, container);
  }

  private async load(sceneItem: SceneNode, container: Container) {
    await PIXI.Assets.load(this.texture);

    createSprite(this.texture, sceneItem, container);
  }
}

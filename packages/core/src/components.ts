import { Container } from "pixi.js";
import { Engine, PIXI } from "..";
import { Component, SceneItem } from "./types";
import { createSprite } from "./utils/scene-items";

export abstract class BaseComponent implements Component {
  init(sceneItem: SceneItem, container: Container): void {}
  sceneItem?: SceneItem;
  engine?: Engine;
}

export class TextureComponent extends BaseComponent implements Component {
  texture: string;

  constructor(texture: string) {
    super();
    this.texture = texture;
  }

  init(sceneItem: SceneItem, container: Container): void {
    this.load(sceneItem, container);
  }

  private async load(sceneItem: SceneItem, container: Container) {
    await PIXI.Assets.load(this.texture);

    createSprite(this.texture, sceneItem, container);
  }
}

import { Container } from "pixi.js";
import { Engine, Input, PIXI } from "..";
import { Component, SceneNode } from "./types";
import { createRect, createSprite } from "./utils/scene-items";
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

    const sprite = createSprite(this.texture, sceneItem);

    container.addChild(sprite);
  }
}

export class CollisionComponent extends BaseComponent implements Component {
  width: number;
  height: number;

  mouseDown: boolean = false;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  init(sceneItem: SceneNode, container: Container): void {
    const rect = createRect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height,
      sceneItem,
    );

    container.addChild(rect);
  }

  checkPointCollision(point: { x: number; y: number }): boolean {
    if (!this.sceneNode) return false;

    const widthOffset = (this.width / 2) * this.sceneNode.transform.scale.x;
    const heightOffset = (this.width / 2) * this.sceneNode.transform.scale.y;

    if (point.x < this.sceneNode.transform.position.x - widthOffset)
      return false;

    if (point.x > this.sceneNode.transform.position.x + widthOffset)
      return false;

    if (point.y < this.sceneNode.transform.position.y - heightOffset)
      return false;

    if (point.y > this.sceneNode.transform.position.y + heightOffset)
      return false;

    return true;
  }

  onUpdate(): void {
    if (!this.sceneNode) return;

    const mousePos = Input.getMousePosition();

    const isColliding = this.checkPointCollision(mousePos);

    if (Input.isMouseButtonPressed(0) && isColliding && !this.mouseDown) {
      this.mouseDown = true;

      this.sceneNode.components.forEach((component) => {
        component.onMouseDown?.(mousePos);
      });
    }

    if (!Input.isMouseButtonPressed(0) && this.mouseDown) {
      this.mouseDown = false;

      this.sceneNode.components.forEach((component) => {
        component.onMouseUp?.(mousePos);
      });
    }

    if (Input.isMouseButtonPressed(0)) {
      this.sceneNode.components.forEach((component) => {
        component.onDrag?.(mousePos);
      });
    }
  }
}

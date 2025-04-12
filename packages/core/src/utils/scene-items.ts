import { Container, ContainerChild, Graphics, Sprite } from "pixi.js";
import { SceneNode, Transform } from "../types";

export function createSceneNode(sceneNode: SceneNode): Container {
  const node = createContainer(sceneNode);

  return node;
}

export function createContainer(item: SceneNode): Container {
  const container = new Container();
  container.label = item.id;

  return container;
}

export function createSprite(texture: string, item: SceneNode): Container {
  const sprite = Sprite.from(texture);
  sprite.label = item.id + "sprite";
  sprite.anchor.set(0.5);

  return sprite;
}

export function createRect(
  x: number,
  y: number,
  w: number,
  h: number,
  item: SceneNode,
): Container {
  const rect = new Graphics().rect(x, y, w, h).fill("0xFF0000");
  rect.label = item.id + "rect";

  return rect;
}

export function updateContainerTransform(
  container: ContainerChild,
  transform: Transform,
) {
  container.position.set(transform.position.x, transform.position.y);
  container.scale.set(transform.scale.x, transform.scale.y);

  container.angle = transform.angle;
}

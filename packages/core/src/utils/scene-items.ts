import { Container, ContainerChild, Sprite } from "pixi.js";
import { SceneItem, Transform } from "../types";

export function createSceneNode(sceneItem: SceneItem): Container {
  const node = createSprite(sceneItem);
  updateContainerTransform(node, sceneItem.transform);

  return node;
}

export function createSprite(item: SceneItem): Container {
  const sprite = Sprite.from("sample.png");
  sprite.label = item.id;
  sprite.anchor.set(0.5);

  return sprite;
}

export function updateContainerTransform(
  container: ContainerChild,
  transform: Transform,
) {
  container.position.set(transform.position.x, transform.position.y);
  container.scale.set(transform.scale.x, transform.scale.y);

  container.angle = transform.angle;
}

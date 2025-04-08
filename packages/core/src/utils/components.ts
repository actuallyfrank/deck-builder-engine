import { Container } from "pixi.js";
import { Engine } from "../engine";
import { SceneNode } from "../types";

export function initComponents(
  engine: Engine,
  sceneItem: SceneNode,
  container: Container,
) {
  sceneItem.components.forEach((component) => {
    Object.defineProperties(component, {
      sceneNode: { value: sceneItem, enumerable: false },
      engine: { value: engine, enumerable: false },
    });
    component.init(sceneItem, container);
  });
}

export function startComponents(sceneItem: SceneNode) {
  sceneItem.components.forEach((component) => {
    component.onStart?.();
  });
}

export function updateComponents(sceneItems: SceneNode[], deltaTime: number) {
  sceneItems.forEach((item) => {
    item.components.forEach((component) => {
      const scriptComponent = component;

      scriptComponent.onUpdate?.(deltaTime);
    });
  });
}

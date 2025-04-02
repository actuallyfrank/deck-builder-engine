import { SceneItem, ScriptComponent } from "../types";

export function initializeComponents(sceneItems: SceneItem[]) {
  sceneItems.forEach((item) => {
    item.components.forEach((component) => {
      component.sceneItem = item;

      const scriptComponent = component as ScriptComponent;

      if (scriptComponent.onStart) {
        scriptComponent.onStart();
      }
    });
  });
}

export function updateComponents(sceneItems: SceneItem[], deltaTime: number) {
  sceneItems.forEach((item) => {
    item.components.forEach((component) => {
      const scriptComponent = component as ScriptComponent;

      scriptComponent.onUpdate?.(deltaTime);
    });
  });
}

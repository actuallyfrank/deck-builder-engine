import { Engine } from "../engine";
import { SceneItem, ScriptComponent } from "../types";

export function initializeSceneItem(engine: Engine, sceneItem: SceneItem) {
  sceneItem.components.forEach((component) => {
    component.sceneItem = sceneItem;
    component.engine = engine;

    const scriptComponent = component as ScriptComponent;

    if (scriptComponent.onStart) {
      scriptComponent.onStart();
    }
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

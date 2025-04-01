import { BaseComponent } from "core";

export class RotatorComponent extends BaseComponent {
  enabled = true;
  rotationSpeed = 0.1;

  onStart() {
    console.log("RotatorComponent started");
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneItem) return;

    this.sceneItem.transform.angle += this.rotationSpeed * deltaTime;

    console.log("onUpdate position", this.sceneItem.transform.position);

    console.log("onUpdate angle", this.sceneItem.transform.angle);
  }
}

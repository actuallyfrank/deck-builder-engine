import { BaseComponent, Input, ScriptComponent } from "core";

export class RotatorComponent extends BaseComponent implements ScriptComponent {
  enabled = true;
  rotationSpeed = 0.1;

  onStart() {
    console.log("RotatorComponent started");
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneItem) return;

    if (Input.isKeyPressed("ArrowRight")) {
      this.sceneItem.transform.angle += this.rotationSpeed * deltaTime;
    }

    if (Input.isKeyPressed("ArrowLeft")) {
      this.sceneItem.transform.angle -= this.rotationSpeed * deltaTime;
    }

    if (Input.isKeyPressed("ArrowUp")) {
      this.sceneItem.transform.position.y -= 1;
    }

    if (Input.isKeyPressed("ArrowDown")) {
      this.sceneItem.transform.position.y += 1;
    }
  }
}

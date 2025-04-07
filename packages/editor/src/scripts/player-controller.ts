import { BaseComponent, Input, ScriptComponent } from "core";

export class PlayerController extends BaseComponent implements ScriptComponent {
  rotationSpeed = 0.2;
  movementSpeed = 0.4;
  mouseSpeed = 0.005;

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

    if (Input.isMouseButtonPressed(0)) {
      console.log("clicked on position", Input.getMousePosition());
    }

    if (Input.isKeyPressed("ArrowUp")) {
      this.sceneItem.transform.position.x +=
        this.sceneItem.transform.up().x * deltaTime * this.movementSpeed;
      this.sceneItem.transform.position.y +=
        this.sceneItem.transform.up().y * deltaTime * this.movementSpeed;
    }
  }
}

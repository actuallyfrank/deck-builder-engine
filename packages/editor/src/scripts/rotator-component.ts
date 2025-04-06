import { BaseComponent, GoodMath, Input, ScriptComponent, Vector2 } from "core";

export class RotatorComponent extends BaseComponent implements ScriptComponent {
  enabled = true;
  rotationSpeed = 0.1;
  mouseSpeed = 0.005;
  targetPosition: Vector2 | undefined = undefined;

  onStart() {
    this.targetPosition = this.sceneItem?.transform.position;

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
      this.targetPosition = Input.getMousePosition();
    }

    if (this.targetPosition) {
      const newPosition = GoodMath.lerp(
        this.sceneItem.transform.position,
        this.targetPosition,
        deltaTime * this.mouseSpeed,
      );
      this.sceneItem.transform.position.x = newPosition.x;
      this.sceneItem.transform.position.y = newPosition.y;
    }
  }
}

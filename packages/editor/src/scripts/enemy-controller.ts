import { BaseComponent, ScriptComponent, Vector2 } from "core";

export class EnemyController extends BaseComponent implements ScriptComponent {
  rotationSpeed = 0;
  moveSpeed = 0.05;
  direction = Vector2.Zero;

  onStart() {
    console.log("EnemyController started");

    this.rotationSpeed = Math.random() * 0.1;
    this.direction = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneItem) return;

    this.sceneItem.transform.angle += this.rotationSpeed * deltaTime;
    this.sceneItem.transform.position.x +=
      this.direction.x * deltaTime * this.moveSpeed;
    this.sceneItem.transform.position.y +=
      this.direction.y * deltaTime * this.moveSpeed;
  }
}

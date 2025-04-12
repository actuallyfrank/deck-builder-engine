import { BaseComponent, Component, Vector2 } from "core";

export class EnemyController extends BaseComponent implements Component {
  rotationSpeed = 0;
  moveSpeed = 0.05;
  direction = Vector2.Zero;
  deleteAfterTime = 20000;
  time = 0;

  onStart() {
    if (!this.sceneNode) {
      return;
    }

    this.rotationSpeed = Math.random() * 0.1;
    this.direction = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);

    this.sceneNode.transform.scale = new Vector2(0, 0);
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneNode || !this.engine) return;

    this.sceneNode.transform.angle += this.rotationSpeed * deltaTime;
    this.sceneNode.transform.position.x +=
      this.direction.x * deltaTime * this.moveSpeed;
    this.sceneNode.transform.position.y +=
      this.direction.y * deltaTime * this.moveSpeed;

    this.time += deltaTime;

    this.sceneNode.transform.scale.x = this.time / this.deleteAfterTime;
    this.sceneNode.transform.scale.y = this.time / this.deleteAfterTime;

    if (this.time >= this.deleteAfterTime) {
      this.engine.destroy(this.sceneNode);
    }
  }
}

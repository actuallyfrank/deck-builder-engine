import { BaseComponent, Component, Input, Vector2 } from "core";

export class PlayerController extends BaseComponent implements Component {
  rotationSpeed = 0.2;
  movementSpeed = 0.4;
  mouseSpeed = 0.005;

  startScale: Vector2 = Vector2.Zero;

  onStart() {
    console.log("PlayerController started");
    this.startScale = this.sceneNode?.transform.scale ?? Vector2.Zero;
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneNode) return;

    if (Input.isKeyPressed("ArrowRight")) {
      this.sceneNode.transform.angle += this.rotationSpeed * deltaTime;
    }

    if (Input.isKeyPressed("ArrowLeft")) {
      this.sceneNode.transform.angle -= this.rotationSpeed * deltaTime;
    }

    if (Input.isKeyPressed("ArrowUp")) {
      this.sceneNode.transform.position.x +=
        this.sceneNode.transform.up().x * deltaTime * this.movementSpeed;
      this.sceneNode.transform.position.y +=
        this.sceneNode.transform.up().y * deltaTime * this.movementSpeed;
    }
  }

  onMouseDown(): void {
    console.log("Mouse down");
    if (!this.sceneNode) return;

    this.sceneNode.transform.scale = new Vector2(
      this.startScale.x + 0.2,
      this.startScale.y + 0.2,
    );
  }

  onMouseUp(): void {
    console.log("Mouse up", this);
    if (!this.sceneNode) return;

    this.sceneNode.transform.scale = this.startScale;
  }
}

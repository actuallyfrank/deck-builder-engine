import { BaseComponent, Component, Input } from "core";

export class PlayerController extends BaseComponent implements Component {
  rotationSpeed = 0.2;
  movementSpeed = 0.4;
  mouseSpeed = 0.005;

  onStart() {
    console.log("PlayerController started");
  }

  onUpdate(deltaTime: number) {
    if (!this.sceneNode) return;

    if (Input.isKeyPressed("ArrowRight")) {
      this.sceneNode.transform.angle += this.rotationSpeed * deltaTime;
    }

    if (Input.isKeyPressed("ArrowLeft")) {
      this.sceneNode.transform.angle -= this.rotationSpeed * deltaTime;
    }

    if (Input.isMouseButtonPressed(0)) {
      console.log("clicked on position", Input.getMousePosition());
    }

    if (Input.isKeyPressed("ArrowUp")) {
      this.sceneNode.transform.position.x +=
        this.sceneNode.transform.up().x * deltaTime * this.movementSpeed;
      this.sceneNode.transform.position.y +=
        this.sceneNode.transform.up().y * deltaTime * this.movementSpeed;
    }
  }
}

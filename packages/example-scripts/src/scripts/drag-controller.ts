import { BaseComponent, Component, Vector2 } from "core";

export class DragController extends BaseComponent implements Component {
  offset: Vector2 = Vector2.Zero;
  isDragging: boolean = false;

  onMouseDown(position: Vector2): void {
    if (!this.sceneNode) return;
    this.offset = new Vector2(
      this.sceneNode.transform.position.x - position.x,
      this.sceneNode.transform.position.y - position.y,
    );
    this.isDragging = true;
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onDrag(position: Vector2): void {
    if (!this.isDragging || !this.sceneNode) return;

    this.sceneNode.transform.position.x = position.x + this.offset.x;
    this.sceneNode.transform.position.y = position.y + this.offset.y;
  }
}

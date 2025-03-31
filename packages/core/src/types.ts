export type NodeTypes =
  | "box"
  | "sphere"
  | "plane"
  | "camera"
  | "light"
  | "empty";

export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static Zero: Vector2 = { x: 0, y: 0 };
}

export interface SceneItem {
  name: string;
  id: string;
  type: NodeTypes;
  transform: {
    position: Vector2;
    scale: Vector2;
    angle: number;
  };
}

export interface Scene {
  sceneItems: SceneItem[];
}

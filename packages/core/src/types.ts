export type NodeTypes =
  | "box"
  | "sphere"
  | "plane"
  | "camera"
  | "light"
  | "empty";

export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static Zero: Vector3 = { x: 0, y: 0, z: 0 };
}

export interface SceneItem {
  name: string;
  id: string;
  type: NodeTypes;
  transform: {
    position: Vector3;
    scale: Vector3;
  };
}

export interface Scene {
  sceneItems: SceneItem[];
}

export type NodeTypes =
  | "box"
  | "sphere"
  | "plane"
  | "camera"
  | "light"
  | "empty";

export interface SceneItem {
  name: string;
  id: string;
  type: NodeTypes;
}

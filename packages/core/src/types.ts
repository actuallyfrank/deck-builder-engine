import { Container } from "pixi.js";
import { GoodMath } from "./math";
import { Engine } from "./engine";

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

  static Zero: Vector2 = new Vector2(0, 0);
}

export class Transform {
  position: Vector2;
  scale: Vector2;
  angle: number;

  constructor({
    position,
    scale,
    angle,
  }: {
    position?: Vector2;
    scale?: Vector2;
    angle?: number;
  } = {}) {
    this.position = position ?? Vector2.Zero;
    this.scale = scale ?? new Vector2(1, 1);
    this.angle = angle ?? 0;
  }

  up(): Vector2 {
    const angleRad = (this.angle - 90) * GoodMath.DEG_TO_RAD;
    return new Vector2(Math.cos(angleRad), Math.sin(angleRad));
  }

  forward(): Vector2 {
    const angleRad = this.angle * GoodMath.DEG_TO_RAD;
    return new Vector2(Math.cos(angleRad), Math.sin(angleRad));
  }
}

export interface Component {
  /**
   * Reference to the scene item this component is attached to
   */
  sceneNode?: SceneNode;

  engine?: Engine;

  init(sceneItem: SceneNode, container: Container): void;

  destroy(): void;

  initialize(sceneItem: SceneNode): void;

  /**
   * Called once when the script component is first initialized
   */
  onInit?(): void;

  /**
   * Called when the component is destroyed
   */
  onDestroy?(): void;

  /**
   * Called before the first frame update
   */
  onStart?(): void;

  /**
   * Called once per frame
   * @param deltaTime Time in seconds since the last frame
   */
  onUpdate?(deltaTime: number): void;

  onMouseDown?(position: Vector2): void;
  onMouseUp?(position: Vector2): void;
  onDrag?(position: Vector2): void;
}

export class SceneNode {
  name: string;
  readonly id: string;
  readonly transform: Transform;
  readonly components: Component[];

  constructor({
    name,
    id,
    transform,
    components,
  }: {
    name: string;
    id?: string;
    transform: Transform;
    components: Component[];
  }) {
    this.name = name;
    this.id = id ?? crypto.randomUUID();
    this.transform = transform;
    this.components = components;
  }
}

export interface Scene {
  nodes: SceneNode[];
}

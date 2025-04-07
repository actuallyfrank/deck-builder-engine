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
  }) {
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
  sceneItem?: SceneItem;

  engine?: Engine;

  init(sceneItem: SceneItem, container: Container): void;
}

export interface ScriptComponent extends Component {
  /**
   * Called once when the script component is first initialized
   */
  onInit?(): void;

  /**
   * Called when the component becomes enabled
   */
  onEnable?(): void;

  /**
   * Called when the component becomes disabled
   */
  onDisable?(): void;

  /**
   * Called before the first frame update
   */
  onStart?(): void;

  /**
   * Called once per frame
   * @param deltaTime Time in seconds since the last frame
   */
  onUpdate?(deltaTime: number): void;

  /**
   * Called when the component is destroyed
   */
  onDestroy?(): void;
}

export class SceneItem {
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

  addComponent(component: Component) {
    this.components.push(component);
  }
}

export interface Scene {
  items: SceneItem[];
}

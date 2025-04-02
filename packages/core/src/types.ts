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

export interface Transform {
  position: Vector2;
  scale: Vector2;
  angle: number;
}

export interface Component {
  /**
   * Reference to the scene item this component is attached to
   */
  sceneItem?: SceneItem;
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

export abstract class BaseComponent implements Component {
  sceneItem?: SceneItem;
}

export interface SceneItem {
  name: string;
  id: string;
  type: NodeTypes;
  transform: Transform;
  components: Component[];
}

export interface Scene {
  items: SceneItem[];
}

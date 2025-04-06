import { Vector2 } from "./types";
import { Log } from "./utils/logger";

const logger = Log.getInstance();

export class Input {
  private static keys: Record<string, boolean> = {};
  private static mousePosition: Vector2 = Vector2.Zero;
  private static isInit = false;

  public static init(canvas: HTMLElement) {
    if (Input.isInit) {
      logger.warn("Input is already initialized");
      return;
    }

    Input.setupEventListeners(canvas);

    Input.isInit = true;
  }

  private static setupEventListeners(canvas: HTMLElement) {
    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });

    canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
      const rect = canvas.getBoundingClientRect();

      this.mousePosition.x = clientX - rect.left;
      this.mousePosition.y = clientY - rect.top;
    });
  }

  public static isKeyPressed(key: string): boolean {
    return !!this.keys[key];
  }

  public static getMousePosition() {
    return this.mousePosition;
  }
}

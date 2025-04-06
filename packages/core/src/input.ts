import { Vector2 } from "./types";
import { Log } from "./utils/logger";

const logger = Log.getInstance();

export class Input {
  private static keys: Record<string, boolean> = {};
  private static isInit = false;

  public static init() {
    if (Input.isInit) {
      logger.warn("Input is already initialized");
      return;
    }

    Input.setupEventListeners();

    Input.isInit = true;
  }

  private static setupEventListeners() {
    window.addEventListener("keydown", (event) => {
      this.keys[event.key] = true;
    });

    window.addEventListener("keyup", (event) => {
      this.keys[event.key] = false;
    });
  }

  public static isKeyPressed(key: string): boolean {
    return !!this.keys[key];
  }
}

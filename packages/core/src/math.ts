import { Vector2 } from "./types";

export abstract class GoodMath {
  public static readonly PI = Math.PI;

  /**
   * Clamps a value between min and max (inclusive)
   * @overload For number values
   */
  public static clamp(value: number, min: number, max: number): number;
  /**
   * Clamps a vector between min and max vectors (component-wise)
   * @overload For Vector2 values
   */
  public static clamp(value: Vector2, min: Vector2, max: Vector2): Vector2;
  /**
   * Implementation of clamp for both number and Vector2
   */
  public static clamp(
    value: number | Vector2,
    min: number | Vector2,
    max: number | Vector2,
  ): number | Vector2 {
    if (
      typeof value === "number" &&
      typeof min === "number" &&
      typeof max === "number"
    ) {
      return Math.max(min, Math.min(max, value));
    }

    return {
      x: Math.max(
        (min as Vector2).x,
        Math.min((max as Vector2).x, (value as Vector2).x),
      ),
      y: Math.max(
        (min as Vector2).y,
        Math.min((max as Vector2).y, (value as Vector2).y),
      ),
    };
  }

  /**
   * Linear interpolation between start and end by t (0-1)
   * @overload For number values
   */
  public static lerp(start: number, end: number, t: number): number;
  /**
   * Linear interpolation between start and end vectors by t (0-1)
   * @overload For Vector2 values
   */
  public static lerp(start: Vector2, end: Vector2, t: number): Vector2;
  /**
   * Implementation of lerp for both number and Vector2
   */
  public static lerp(
    start: number | Vector2,
    end: number | Vector2,
    t: number,
  ): number | Vector2 {
    const clampedT = typeof t === "number" ? Math.max(0, Math.min(1, t)) : 0;

    if (typeof start === "number" && typeof end === "number") {
      return start + (end - start) * clampedT;
    }

    return {
      x:
        (start as Vector2).x +
        ((end as Vector2).x - (start as Vector2).x) * clampedT,
      y:
        (start as Vector2).y +
        ((end as Vector2).y - (start as Vector2).y) * clampedT,
    };
  }
}

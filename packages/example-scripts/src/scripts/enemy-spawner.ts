import {
  BaseComponent,
  Component,
  SceneNode,
  TextureComponent,
  Transform,
  Vector2,
} from "core";
import { EnemyController } from "./enemy-controller";

export class EnemySpawner extends BaseComponent implements Component {
  spawnInterval = 10000;
  spawnCount = 4;
  spawnRadius = 100;
  enabled = true;

  time = 0;

  onStart() {
    if (!this.sceneNode) {
      return;
    }
    console.log("EnemySpawner started");
  }

  onUpdate(deltaTime: number) {
    this.time += deltaTime;

    if (this.time >= this.spawnInterval) {
      this.spawnEnemies();
      this.time = 0;
    }
  }

  spawnEnemies() {
    if (!this.sceneNode || !this.enabled) return;
    const currentPosition = this.sceneNode.transform.position;

    for (let i = 0; i < this.spawnCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * this.spawnRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const enemy = new SceneNode({
        name: "Enemy",
        transform: new Transform({
          position: new Vector2(currentPosition.x + x, currentPosition.y + y),
        }),
        components: [
          new EnemyController(),
          new TextureComponent("egg-head.png"),
        ],
      });

      this.initialize(enemy);
    }
  }
}

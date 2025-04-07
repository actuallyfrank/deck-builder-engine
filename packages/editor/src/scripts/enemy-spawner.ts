import {
  BaseComponent,
  SceneItem,
  ScriptComponent,
  TextureComponent,
  Transform,
  Vector2,
} from "core";
import { EnemyController } from "./enemy-controller";

export class EnemySpawner extends BaseComponent implements ScriptComponent {
  spawnInterval = 2000;
  spawnCount = 2;
  spawnRadius = 100;

  time = 0;

  onStart() {
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
    if (!this.sceneItem) return;
    const currentPosition = this.sceneItem.transform.position;

    for (let i = 0; i < this.spawnCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * this.spawnRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      const enemy = new SceneItem({
        name: "Enemy",
        transform: new Transform({
          position: new Vector2(currentPosition.x + x, currentPosition.y + y),
        }),
        components: [
          new EnemyController(),
          new TextureComponent("egg-head.png"),
        ],
      });

      if (this.engine) this.engine.initialize(enemy);
    }
  }
}

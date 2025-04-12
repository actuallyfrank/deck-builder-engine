import { PlayerController } from "example-scripts";
import "./style.css";
import {
  CollisionComponent,
  Engine,
  SceneNode,
  TextureComponent,
  Transform,
} from "core";

const engine = new Engine();

await engine.init(window);

document.getElementById("app")?.appendChild(engine.getCanvas());

engine.start({
  scene: {
    nodes: [
      new SceneNode({
        name: "player",
        transform: new Transform(),
        components: [
          new TextureComponent("sample.png"),
          new CollisionComponent(200, 200),
          new PlayerController(),
        ],
      }),
    ],
  },
});

console.log("Engine initialized");

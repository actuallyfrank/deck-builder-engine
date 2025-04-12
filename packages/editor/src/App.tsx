import {
  CollisionComponent,
  SceneNode,
  TextureComponent,
  Transform,
  Vector2,
} from "core";
import "./App.css";
import { Inspector } from "./features/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./features/scene/scene";
import { Viewport } from "./features/viewport/viewport";
import { SceneProvider } from "./provider/scene-provider";
import {
  DragController,
  EnemyController,
  EnemySpawner,
  PlayerController,
} from "example-scripts";

const testItems: SceneNode[] = [
  new SceneNode({
    name: "Player",
    transform: new Transform({
      position: new Vector2(100, 100),
      scale: new Vector2(0.5, 0.5),
      angle: 0,
    }),
    components: [
      new PlayerController(),
      new TextureComponent("sample.png"),
      new CollisionComponent(200, 200),
    ],
  }),
  new SceneNode({
    name: "Enemy ",
    transform: new Transform({
      position: new Vector2(350, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    }),
    components: [new TextureComponent("egg-head.png"), new EnemyController()],
  }),
  new SceneNode({
    name: "enemy spanwer",
    transform: new Transform({
      position: new Vector2(350, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    }),
    components: [new EnemySpawner()],
  }),
  new SceneNode({
    name: "drag demo",
    transform: new Transform({
      position: new Vector2(200, 200),
      scale: new Vector2(0.1, 0.1),
    }),
    components: [
      new CollisionComponent(1000, 1000),
      new DragController(),
      new TextureComponent("crate.png"),
    ],
  }),
];

function App() {
  return (
    <SceneProvider
      initialScene={{
        nodes: testItems,
      }}
    >
      <Layout>
        <Scene />
        <Viewport />
        <Inspector />
      </Layout>
    </SceneProvider>
  );
}

export default App;

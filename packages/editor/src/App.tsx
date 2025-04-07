import { SceneItem, TextureComponent, Transform, Vector2 } from "core";
import "./App.css";
import { Inspector } from "./features/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./features/scene/scene";
import { Viewport } from "./features/viewport/viewport";
import { SceneProvider } from "./provider/scene-provider";
import { PlayerController } from "./scripts/player-controller";
import { EnemyController } from "./scripts/enemy-controller";
import { EnemySpawner } from "./scripts/enemy-spawner";

const testItems: SceneItem[] = [
  new SceneItem({
    name: "Player",
    transform: new Transform({
      position: new Vector2(100, 100),
      scale: new Vector2(0.5, 0.5),
      angle: 0,
    }),
    components: [new PlayerController(), new TextureComponent("sample.png")],
  }),
  new SceneItem({
    name: "test 3 ",
    transform: new Transform({
      position: new Vector2(350, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    }),
    components: [new TextureComponent("egg-head.png"), new EnemyController()],
  }),
  new SceneItem({
    name: "enemy spanwer",
    transform: new Transform({
      position: new Vector2(350, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    }),
    components: [new EnemySpawner()],
  }),
];

function App() {
  return (
    <SceneProvider
      initialScene={{
        items: testItems,
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

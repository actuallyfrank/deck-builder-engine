import { SceneItem, Vector2 } from "core";
import "./App.css";
import { Inspector } from "./features/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./features/scene/scene";
import { Viewport } from "./features/viewport/viewport";
import { SceneProvider } from "./provider/scene-provider";
import { RotatorComponent } from "./scripts/rotator-component";

const testItems: SceneItem[] = [
  {
    name: "test",
    id: "1",
    type: "empty",
    transform: {
      position: new Vector2(100, 100),
      scale: new Vector2(1, 1),
      angle: 0,
    },
    components: [new RotatorComponent()],
  },
  {
    name: "test 2 ",
    id: "2",
    type: "box",
    transform: {
      position: new Vector2(200, 500),
      scale: new Vector2(1, 1),
      angle: 0,
    },
    components: [],
  },
  {
    name: "test 3 ",
    id: "3",
    type: "box",
    transform: {
      position: new Vector2(350, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    },
    components: [],
  },
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

import { SceneItem, Vector2 } from "core";
import "./App.css";
import { Inspector } from "./features/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./features/scene/scene";
import { Viewport } from "./features/viewport/viewport";
import { SceneProvider } from "./provider/scene-provider";

const testItems: SceneItem[] = [
  {
    name: "test",
    id: "1",
    type: "empty",
    transform: { position: Vector2.Zero, scale: new Vector2(1, 1), angle: 0 },
  },
  {
    name: "test 2 ",
    id: "2",
    type: "box",
    transform: {
      position: new Vector2(1, 200),
      scale: new Vector2(1, 1),
      angle: 0,
    },
  },
];

function App() {
  return (
    <SceneProvider sceneItems={testItems}>
      <Layout>
        <Scene />
        <Viewport />
        <Inspector />
      </Layout>
    </SceneProvider>
  );
}

export default App;

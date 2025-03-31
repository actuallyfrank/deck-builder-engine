import { SceneItem, Vector3 } from "core";
import "./App.css";
import { Inspector } from "./components/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./components/scene/scene";
import { Viewport } from "./components/viewport/viewport";
import { SceneProvider } from "./provider/scene-provider";

const testItems: SceneItem[] = [
  {
    name: "test",
    id: "1",
    type: "empty",
    transform: { position: Vector3.Zero, scale: new Vector3(1, 1, 1) },
  },
  {
    name: "test 2 ",
    id: "2",
    type: "box",
    transform: {
      position: new Vector3(1, 200, 3),
      scale: new Vector3(1, 1, 1),
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

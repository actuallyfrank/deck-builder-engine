import { SceneItem } from "core";
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
  },
  {
    name: "test 2 ",
    id: "2",
    type: "box",
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

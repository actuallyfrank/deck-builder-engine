import "./App.css";
import { Inspector } from "./components/inspector/inspector";
import { Layout } from "./components/layout/layout";
import { Scene } from "./components/scene/scene";
import { Viewport } from "./components/viewport/viewport";

function App() {
  return (
    <Layout>
      <Scene />
      <Viewport />
      <Inspector />
    </Layout>
  );
}

export default App;

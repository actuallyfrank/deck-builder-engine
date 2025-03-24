import { Panel } from "../panel/panel";
import { useScene } from "../../provider/scene-provider";
import "./scene.css";

export const Scene = () => {
  const { sceneItems, selectItem, selectedItemId } = useScene();

  return (
    <Panel name="scene">
      {sceneItems.map((item) => (
        <div
          className={`item ${selectedItemId === item.id ? "item-selected" : ""}`}
          role="button"
          key={item.id}
          onClick={() => selectItem(item.id)}
        >
          {item.name}
        </div>
      ))}
    </Panel>
  );
};

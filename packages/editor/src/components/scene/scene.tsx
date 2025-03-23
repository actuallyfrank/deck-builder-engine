import { Panel } from "../panel/panel";
import { useScene } from "../../provider/scene-provider";

export const Scene = () => {
  const { sceneItems, selectItem, selectedItemId } = useScene();

  return (
    <Panel name="scene">
      {sceneItems.map((item) => (
        <div role="button" key={item.id} onClick={() => selectItem(item.id)}>
          {item.name} {selectedItemId === item.id ? "selected" : ""}
        </div>
      ))}
    </Panel>
  );
};

import { SceneItem } from "core";
import { Panel } from "../../components/panel/panel";
import { useScene } from "../../provider/scene-provider";
import "./scene.css";
import { RotatorComponent } from "../../scripts/rotator-component";
import { useKeyPress } from "../../hooks/use-keyboard-event";

export const Scene = () => {
  const { sceneItems, selectItem, selectedItemId, addItem, deleteItem } =
    useScene();

  const createNewItem = () => {
    const randomPosition = {
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    };
    const newItem: SceneItem = {
      name: "test item",
      id: crypto.randomUUID(),
      type: "box",
      transform: {
        position: randomPosition,
        angle: 0,
        scale: { x: 1, y: 1 },
      },
      components: [new RotatorComponent()],
    };

    addItem(newItem);
  };

  useKeyPress("Delete", () => {
    if (selectedItemId) {
      deleteItem(selectedItemId);
    }
  });

  return (
    <Panel name="scene">
      <button onClick={createNewItem}>Add</button>
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

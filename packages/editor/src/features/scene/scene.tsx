import { SceneNode, TextureComponent, Transform } from "core";
import { Panel } from "../../components/panel/panel";
import { useScene } from "../../provider/scene-provider";
import "./scene.css";
import { useKeyPress } from "../../hooks/use-keyboard-event";
import { EnemyController } from "example-scripts";

export const Scene = () => {
  const { sceneItems, selectItem, selectedItemId, addItem, deleteItem } =
    useScene();

  const createNewItem = () => {
    const randomPosition = {
      x: Math.random() * 500,
      y: Math.random() * 500,
    };
    const newItem = new SceneNode({
      name: "test item",
      transform: new Transform({
        position: randomPosition,
      }),
      components: [new TextureComponent("egg-head.png"), new EnemyController()],
    });

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

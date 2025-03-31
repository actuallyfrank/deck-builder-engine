import { useScene } from "../../provider/scene-provider";
import { Panel } from "../panel/panel";

export const Inspector = () => {
  const { selectedItem, updateItem } = useScene();

  if (!selectedItem) {
    return <Panel name="inspector">No item selected</Panel>;
  }

  const {
    transform: { position },
  } = selectedItem;

  const updatePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = { ...position, x: parseFloat(e.target.value) };

    console.log("INSPECTOR update position", newPosition);

    updateItem({
      ...selectedItem,
      transform: {
        ...selectedItem.transform,
        position: newPosition,
      },
    });
  };

  return (
    <Panel name="inspector">
      {"Name: " + selectedItem.name}
      <Panel.Area name="position">
        {position.x + ", " + position.y + ", " + position.z}
        <input value={position.x} onChange={updatePosition} />
      </Panel.Area>
    </Panel>
  );
};

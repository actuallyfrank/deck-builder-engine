import { useScene } from "../../provider/scene-provider";
import { Panel } from "../panel/panel";

export const Inspector = () => {
  const { selectedItem } = useScene();

  if (!selectedItem) {
    return <Panel name="inspector">No item selected</Panel>;
  }

  const {
    transform: { position },
  } = selectedItem;

  return (
    <Panel name="inspector">
      {"Name: " + selectedItem.name}
      <Panel.Area name="position">
        {position.x + ", " + position.y + ", " + position.z}
      </Panel.Area>
    </Panel>
  );
};

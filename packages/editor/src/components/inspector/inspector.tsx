import { useScene } from "../../provider/scene-provider";
import { Panel } from "../panel/panel";

export const Inspector = () => {
  const { selectedItem } = useScene();

  return (
    <Panel name="inspector">
      {selectedItem! ? "Name: " + selectedItem.name : "No item selected"}
    </Panel>
  );
};

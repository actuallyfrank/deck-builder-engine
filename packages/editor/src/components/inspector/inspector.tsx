import { useScene } from "../../provider/scene-provider";
import { Panel } from "../panel/panel";

export const Inspector = () => {
  const { selectedItem, updateItem } = useScene();

  if (!selectedItem) {
    return <Panel name="inspector">No item selected</Panel>;
  }

  const {
    transform: { position, scale },
  } = selectedItem;

  const updatePosition = (
    e: React.ChangeEvent<HTMLInputElement>,
    axis: "x" | "y",
  ) => {
    const value = parseFloat(e.target.value);

    if (value === undefined || isNaN(value)) {
      return;
    }

    const newPosition = {
      ...position,
      x: axis === "x" ? value : position.x,
      y: axis === "y" ? value : position.y,
    };

    updateItem({
      ...selectedItem,
      transform: {
        ...selectedItem.transform,
        position: newPosition,
      },
    });
  };

  const updateScale = (
    e: React.ChangeEvent<HTMLInputElement>,
    axis: "x" | "y",
  ) => {
    const value = parseFloat(e.target.value);

    if (value === undefined || isNaN(value)) {
      return;
    }

    const newScale = {
      ...scale,
      x: axis === "x" ? value : scale.x,
      y: axis === "y" ? value : scale.y,
    };

    updateItem({
      ...selectedItem,
      transform: {
        ...selectedItem.transform,
        scale: newScale,
      },
    });
  };

  return (
    <Panel name="inspector">
      {"Name: " + selectedItem.name}
      <Panel.Area name="position">
        <label>
          X:
          <input value={position.x} onChange={(e) => updatePosition(e, "x")} />
        </label>
        <label>
          Y:
          <input value={position.y} onChange={(e) => updatePosition(e, "y")} />
        </label>
      </Panel.Area>
      <Panel.Area name="scale">
        <label>
          X:
          <input value={scale.x} onChange={(e) => updateScale(e, "x")} />
        </label>
        <label>
          Y:
          <input value={scale.y} onChange={(e) => updateScale(e, "y")} />
        </label>
      </Panel.Area>
    </Panel>
  );
};

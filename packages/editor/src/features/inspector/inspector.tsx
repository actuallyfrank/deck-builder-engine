import { useScene } from "../../provider/scene-provider";
import { Panel } from "../../components/panel/panel";
import { Input } from "./components/input";

export const Inspector = () => {
  const { selectedItem, updateItem } = useScene();

  if (!selectedItem) {
    return <Panel name="inspector">No item selected</Panel>;
  }

  const {
    transform: { position, scale },
  } = selectedItem;

  const updatePosition = (value: number, axis: "x" | "y") => {
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

  const updateScale = (value: number, axis: "x" | "y") => {
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

  const updateAngle = (value: number) => {
    updateItem({
      ...selectedItem,
      transform: {
        ...selectedItem.transform,
        angle: value,
      },
    });
  };

  const updateName = (value: string) => {
    updateItem({
      ...selectedItem,
      name: value,
    });
  };

  return (
    <Panel name="inspector">
      <Input name="name" value={selectedItem.name} onChange={updateName} />
      <Panel.Area name="position">
        <Input
          name="X"
          value={position.x}
          onChange={(value) => updatePosition(value, "x")}
        />
        <Input
          name="Y"
          value={position.y}
          onChange={(value) => updatePosition(value, "y")}
        />
      </Panel.Area>
      <Panel.Area name="scale">
        <Input
          name="X"
          value={scale.x}
          onChange={(value) => updateScale(value, "x")}
        />
        <Input
          name="Y"
          value={scale.y}
          onChange={(value) => updateScale(value, "y")}
        />
      </Panel.Area>
      <Panel.Area name="angle">
        <Input
          name="degrees"
          value={selectedItem.transform.angle}
          onChange={updateAngle}
        />
      </Panel.Area>
      {selectedItem.components.map((component) => (
        <Panel.Area
          name={component.constructor.name}
          key={component.constructor.name}
        >
          <div>
            {Object.entries(component).map(([key, value]) => (
              <div key={key}>
                <strong>{key}</strong>:{" "}
                {typeof value === "number" ||
                typeof value === "string" ||
                typeof value === "boolean"
                  ? value
                  : null}
              </div>
            ))}
          </div>
        </Panel.Area>
      ))}
    </Panel>
  );
};

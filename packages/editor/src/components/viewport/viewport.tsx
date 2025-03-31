import { App, PIXI } from "core";
import { Panel } from "../panel/panel";
import { memo, RefObject, useEffect, useRef, useState } from "react";
import { useScene } from "../../provider/scene-provider";

export const Viewport = memo(() => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  return (
    <Panel ref={containerRef} name="viewport">
      {containerRef && <RenderViewport containerRef={containerRef} />}
    </Panel>
  );
});

await PIXI.Assets.load("sample.png");

export const RenderViewport = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const { sceneItems } = useScene();
  const appRef = useRef<PIXI.Application | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const app = await App(containerRef.current!);

      if (appRef.current) {
        return;
      }

      document.getElementById("viewport")?.appendChild(app.canvas);

      appRef.current = app;

      setIsLoaded(true);
    };

    initializeApp();
  }, [containerRef]);

  sceneItems.forEach((item) => {
    let itemInScene = appRef.current?.stage.children.find(
      (child) => child.label === item.id,
    );
    if (!itemInScene) {
      const sprite = PIXI.Sprite.from("sample.png");
      sprite.label = item.id;
      itemInScene = appRef.current?.stage.addChild(sprite);

      console.log("add item to scene", itemInScene);
      return;
    }

    itemInScene.position.set(
      item.transform.position.x,
      item.transform.position.y,
    );
    itemInScene.scale.set(item.transform.scale.x, item.transform.scale.y);
  });

  return (
    <div
      id="viewport"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

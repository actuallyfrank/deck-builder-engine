import { App, PIXI } from "core";
import { Panel } from "../panel/panel";
import { memo, RefObject, useEffect, useRef } from "react";
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
const sprite = PIXI.Sprite.from("sample.png");

export const RenderViewport = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const { sceneItems } = useScene();
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      const app = await App(containerRef.current!);

      if (appRef.current) {
        return;
      }

      app.stage.addChild(sprite);
      document.getElementById("viewport")?.appendChild(app.canvas);

      appRef.current = app;
    };

    initializeApp();
  }, [containerRef]);

  sprite.position.set(0, sprite.position.y + 2);

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

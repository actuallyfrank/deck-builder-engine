import { App, PIXI } from "core";
import { Panel } from "../panel/panel";
import { RefObject, useEffect, useRef } from "react";

export const Viewport = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  return (
    <Panel ref={containerRef} name="viewport">
      {containerRef && <RenderViewport containerRef={containerRef} />}
    </Panel>
  );
};

export const RenderViewport = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  useEffect(() => {
    const initializeApp = async () => {
      const app = await App(containerRef.current!);
      await PIXI.Assets.load("sample.png");

      document.getElementById("viewport")?.appendChild(app.canvas);

      app.stage.addChild(PIXI.Sprite.from("sample.png"));
    };

    initializeApp();
  }, [containerRef]);

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

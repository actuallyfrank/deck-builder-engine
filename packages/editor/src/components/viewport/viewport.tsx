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

export const RenderViewport = ({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const { sceneItems } = useScene();
  const appRef = useRef<PIXI.Application | null>(null);

  useEffect(() => {
    if (appRef.current) {
      return;
    }
    const initializeApp = async () => {
      const app = await App(containerRef.current!);

      document.getElementById("viewport")?.appendChild(app.canvas);

      appRef.current = app;
    };

    initializeApp();
  }, [containerRef]);

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0xff0000);
  graphics.drawRect(50, 50, 100, 100);
  graphics.endFill();
  appRef.current?.stage.addChild(graphics);

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

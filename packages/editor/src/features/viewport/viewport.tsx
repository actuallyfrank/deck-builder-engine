import { Engine, PIXI } from "core";
import { Panel } from "../../components/panel/panel";
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
  const engineRef = useRef<Engine | null>(null);

  const [, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      const engine = new Engine({
        debugMode: true,
      });
      await engine.init(containerRef.current!);

      if (engineRef.current) {
        return;
      }

      document.getElementById("viewport")?.appendChild(engine.getCanvas());

      engineRef.current = engine;

      setIsLoaded(true);
    };

    initializeApp();
  }, [containerRef]);

  if (engineRef.current) {
    engineRef.current.updateScene({ nodes: sceneItems });
  }

  return (
    <>
      <button onClick={() => engineRef.current?.start({ nodes: sceneItems })}>
        start
      </button>
      <button onClick={() => engineRef.current?.stop({ nodes: sceneItems })}>
        stop
      </button>
      <div
        id="viewport"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
};

import { Application } from "pixi.js";

export const App = async (resizeTo: HTMLElement | Window) => {
  const app = new Application();
  await app.init({ resizeTo });
  return app;
};

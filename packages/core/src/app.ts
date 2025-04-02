import { Application, ContainerChild } from "pixi.js";

export class PixiApp {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async init(resizeTo: HTMLElement | Window): Promise<void> {
    await this.app.init({ resizeTo, autoStart: false });
  }

  getCanvas() {
    return this.app.canvas;
  }

  findChildById(id: string): ContainerChild | undefined {
    return this.app.stage.children.find((child) => child.label === id);
  }

  addChild(child: ContainerChild) {
    return this.app.stage.addChild(child);
  }

  render() {
    this.app.render();
  }
}

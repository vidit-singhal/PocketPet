import Phaser from "phaser";

/**
 * First scene Phaser runs. V1: no asset loading yet — hand off to WorldScene immediately.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  create() {
    this.scene.start("WorldScene");
  }
}

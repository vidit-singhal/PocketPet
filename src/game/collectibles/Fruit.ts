import Phaser from "phaser";

export type FruitType =
  | "apple"
  | "carrot"
  | "nut"
  | "berry";

export class Fruit {
  readonly sprite: Phaser.GameObjects.Arc;
  readonly type: FruitType;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: FruitType
  ) {
    this.type = type;

    const colorMap = {
      apple: 0xff0000,
      carrot: 0xff8c00,
      nut: 0x8b4513,
      berry: 0xff69b4,
    };

    this.sprite = scene.add.circle(
      x,
      y,
      12,
      colorMap[type]
    );
  }

  destroy() {
    this.sprite.destroy();
  }
}
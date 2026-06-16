import Phaser from "phaser";

export type AnimalType =
  | "bunny"
  | "squirrel"
  | "fox";

export class Animal {
  public label: Phaser.GameObjects.Text;
  public sprite:
    | Phaser.GameObjects.Rectangle
    | Phaser.GameObjects.Triangle
    | Phaser.GameObjects.Star;

  public type: AnimalType;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    type: AnimalType
  ) {
    this.type = type;

    switch (type) {
      case "bunny":
        this.sprite = scene.add.rectangle(
          x,
          y,
          24,
          24,
          0xffffff
        );
        break;

      case "squirrel":
        this.sprite = scene.add.triangle(
          x,
          y,
          0,
          24,
          12,
          0,
          24,
          24,
          0x8b4513
        );
        break;

      case "fox":
        this.sprite = scene.add.star(
          x,
          y,
          5,
          8,
          16,
          0xff6600
        );
        break;
    }

    this.label = scene.add.text(
      x,
      y - 25,
      type,
      {
        fontSize: "12px",
        color: "#ffffff",
      }
    );
    
    this.label.setOrigin(0.5);
  }

  destroy() {
    this.sprite.destroy();
    this.label.destroy();
  }
  
}
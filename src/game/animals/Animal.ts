import Phaser from "phaser";

export type AnimalType =
  | "bunny"
  | "squirrel"
  | "fox";

export class Animal {
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

    scene.add.text(
      x - 20,
      y - 30,
      type,
      {
        fontSize: "12px",
        color: "#ffffff",
      }
    );
  }
}
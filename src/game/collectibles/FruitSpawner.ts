import Phaser from "phaser";
import { Fruit, FruitType } from "./Fruit";

export class FruitSpawner {
  static spawn(
    scene: Phaser.Scene,
    worldWidth: number,
    worldHeight: number
  ) {
    const fruits: Fruit[] = [];

    const fruitTypes: FruitType[] = [
      "apple",
      "carrot",
      "nut",
      "berry",
    ];

    for (let i = 0; i < 25; i++) {
      const type =
        fruitTypes[
          Phaser.Math.Between(
            0,
            fruitTypes.length - 1
          )
        ];

      fruits.push(
        new Fruit(
          scene,
          Phaser.Math.Between(
            50,
            worldWidth - 50
          ),
          Phaser.Math.Between(
            50,
            worldHeight - 50
          ),
          type
        )
      );
    }

    return fruits;
  }
}
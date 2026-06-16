import Phaser from "phaser";
import { Animal, AnimalType } from "./Animal";

export class AnimalSpawner {
  static spawn(
    scene: Phaser.Scene,
    worldWidth: number,
    worldHeight: number
  ) {
    const animals: Animal[] = [];

    const types: AnimalType[] = [
      "bunny",
      "squirrel",
      "fox",
    ];

    for (let i = 0; i < 8; i++) {
      const type =
        types[
          Phaser.Math.Between(
            0,
            types.length - 1
          )
        ];

      animals.push(
        new Animal(
          scene,
          Phaser.Math.Between(
            100,
            worldWidth - 100
          ),
          Phaser.Math.Between(
            100,
            worldHeight - 100
          ),
          type
        )
      );
    }

    return animals;
  }
}
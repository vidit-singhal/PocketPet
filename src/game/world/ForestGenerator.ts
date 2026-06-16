import Phaser from "phaser";

export class ForestGenerator {
  static generate(scene: Phaser.Scene, worldWidth: number, worldHeight: number) {
    // Grass background
    scene.add.rectangle(
      worldWidth / 2,
      worldHeight / 2,
      worldWidth,
      worldHeight,
      0x4caf50
    );

    // Trees
    for (let i = 0; i < 80; i++) {
      const x = Phaser.Math.Between(50, worldWidth - 50);
      const y = Phaser.Math.Between(50, worldHeight - 50);

      scene.add.circle(x, y, 25, 0x1b5e20);
    }

    // Rocks
    for (let i = 0; i < 40; i++) {
      const x = Phaser.Math.Between(50, worldWidth - 50);
      const y = Phaser.Math.Between(50, worldHeight - 50);

      scene.add.rectangle(x, y, 30, 30, 0x757575);
    }

    // Main path
    scene.add.rectangle(
      worldWidth / 2,
      worldHeight / 2,
      worldWidth,
      120,
      0xc2b280
    );

    // Vertical path
    scene.add.rectangle(
      worldWidth / 2,
      worldHeight / 2,
      120,
      worldHeight,
      0xc2b280
    );
  }
}
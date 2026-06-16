import Phaser from "phaser";

import { WORLD_HEIGHT, WORLD_WIDTH } from "@/game/constants/world";
import { Player } from "@/game/entities/player/Player";

/**
 * Main gameplay scene. Spawns the world, player, camera, and runs the update loop.
 */
export class WorldScene extends Phaser.Scene {
  private player!: Player;

  constructor() {
    super({ key: "WorldScene" });
  }

  create() {
    this.drawWorld();
    this.player = new Player(this, WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
    this.setupCamera();
  }

  update(_time: number, delta: number) {
    this.player.update(delta, WORLD_WIDTH, WORLD_HEIGHT);
  }

  private drawWorld() {
    this.add.rectangle(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      WORLD_WIDTH,
      WORLD_HEIGHT,
      0x4ade80,
    );

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x22c55e, 0.35);

    for (let x = 0; x <= WORLD_WIDTH; x += 100) {
      grid.lineBetween(x, 0, x, WORLD_HEIGHT);
    }

    for (let y = 0; y <= WORLD_HEIGHT; y += 100) {
      grid.lineBetween(0, y, WORLD_WIDTH, y);
    }
  }

  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
  }
}

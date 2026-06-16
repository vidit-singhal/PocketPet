import Phaser from "phaser";
import { ForestGenerator } from "@/game/world/ForestGenerator";
import { Fruit } from "@/game/collectibles/Fruit";
import { FruitSpawner } from "@/game/collectibles/FruitSpawner";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/game/constants/world";
import { Player } from "@/game/entities/player/Player";

/**
 * Main gameplay scene. Spawns the world, player, camera, and runs the update loop.
 */
export class WorldScene extends Phaser.Scene {
  private player!: Player;
  private fruits: Fruit[] = [];
  private collectedCount = 0;

  constructor() {
    super({ key: "WorldScene" });
  }

  create() {
    ForestGenerator.generate(
      this,
      WORLD_WIDTH,
      WORLD_HEIGHT
    );
    this.player = new Player(this, WORLD_WIDTH / 2, WORLD_HEIGHT / 2);
    this.setupCamera();
    this.fruits = FruitSpawner.spawn(
      this,
      WORLD_WIDTH,
      WORLD_HEIGHT
    );
  }

  update(_time: number, delta: number) {
    this.player.update(delta, WORLD_WIDTH, WORLD_HEIGHT);
    this.fruits = this.fruits.filter((fruit) => {
      const distance = Phaser.Math.Distance.Between(
        this.player.sprite.x,
        this.player.sprite.y,
        fruit.sprite.x,
        fruit.sprite.y
      );
    
      if (distance < 30) {
        console.log(
          `Collected ${fruit.type}`
        );
    
        this.collectedCount++;
    
        fruit.destroy();
    
        return false;
      }
    
      return true;
    });
  }



  private setupCamera() {
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
  }
}

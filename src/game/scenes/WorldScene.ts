import Phaser from "phaser";
import { ForestGenerator } from "@/game/world/ForestGenerator";
import { Fruit } from "@/game/collectibles/Fruit";
import { FruitSpawner } from "@/game/collectibles/FruitSpawner";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/game/constants/world";
import { Player } from "@/game/entities/player/Player";
import { Inventory } from "@/game/inventory/Inventory";

/**
 * Main gameplay scene. Spawns the world, player, camera, and runs the update loop.
 */
export class WorldScene extends Phaser.Scene {
  private player!: Player;
  private fruits: Fruit[] = [];
  private collectedCount = 0;
  private inventory = new Inventory();
  private inventoryText!: Phaser.GameObjects.Text;

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
    this.inventoryText = this.add.text(
      16,
      16,
      "",
      {
        color: "#ffffff",
        fontSize: "20px",
      }
    );

    this.inventoryText.setScrollFactor(0);
    this.updateInventoryUI();
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
        this.inventory.add(
          fruit.type as
            | "apple"
            | "carrot"
            | "nut"
            | "berry"
        );

        this.updateInventoryUI();
    
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
  private updateInventoryUI() {
    const items = this.inventory.getItems();

    this.inventoryText.setText(
      [
        `🍎 ${items.apple}`,
        `🥕 ${items.carrot}`,
        `🌰 ${items.nut}`,
        `🍓 ${items.berry}`,
      ].join("\n")
    );
  }
}

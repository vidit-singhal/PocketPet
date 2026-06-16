import Phaser from "phaser";
import { ForestGenerator } from "@/game/world/ForestGenerator";
import { Fruit } from "@/game/collectibles/Fruit";
import { FruitSpawner } from "@/game/collectibles/FruitSpawner";
import { WORLD_HEIGHT, WORLD_WIDTH } from "@/game/constants/world";
import { Player } from "@/game/entities/player/Player";
import { Inventory } from "@/game/inventory/Inventory";
import { Pet } from "@/game/pets/Pet";
import { PetFollower } from "@/game/pets/PetFollower";

/**
 * Main gameplay scene. Spawns the world, player, camera, and runs the update loop.
 */
export class WorldScene extends Phaser.Scene {
  private player!: Player;
  private fruits: Fruit[] = [];
  private collectedCount = 0;
  private inventory = new Inventory();
  private inventoryText!: Phaser.GameObjects.Text;
  private pet = new Pet();
  private petText!: Phaser.GameObjects.Text;
  private lastPetTick = 0;
  private feedKeys!: {
    one: Phaser.Input.Keyboard.Key;
    two: Phaser.Input.Keyboard.Key;
    three: Phaser.Input.Keyboard.Key;
    four: Phaser.Input.Keyboard.Key;
  };
  private bunnyFollower!: PetFollower;

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
    this.inventoryText.setDepth(999);
    this.updateInventoryUI();

    this.petText = this.add.text(
      16,
      120,
      "",
      {
        color: "#ffffff",
        fontSize: "20px",
      }
    );
    
    this.petText.setScrollFactor(0);
    this.petText.setDepth(999);
    
    this.updatePetUI();

    this.feedKeys = {
      one: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.ONE
      ),
      two: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.TWO
      ),
      three: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.THREE
      ),
      four: this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes.FOUR
      ),
    };

    this.bunnyFollower = new PetFollower(
      this,
      this.player.sprite.x - 50,
      this.player.sprite.y - 50
    );

  }

  update(time: number, delta: number) {
    this.player.update(delta, WORLD_WIDTH, WORLD_HEIGHT);
    this.bunnyFollower.update(
      this.player.sprite.x - 40,
      this.player.sprite.y - 40,
      delta
    );
    
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

    const PET_TICK_INTERVAL = 30000;

    if (time - this.lastPetTick > PET_TICK_INTERVAL) {
      this.pet.tick();
      this.updatePetUI();
  
      this.lastPetTick = time;
    }

    this.handleFeeding();
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

  private updatePetUI() {
    this.petText.setText([
      `${this.pet.type} ${this.pet.name}`,
      `❤️ ${this.pet.happiness}`,
      `🍖 ${this.pet.hunger}`,
      `⚡ ${this.pet.energy}`,
    ]);
  }

  private handleFeeding() {
    if (
      Phaser.Input.Keyboard.JustDown(
        this.feedKeys.one
      )
    ) {
      if (this.inventory.remove("apple")) {
        this.pet.feedApple();
        this.updateInventoryUI();
        this.updatePetUI();
      }
    }
  
    if (
      Phaser.Input.Keyboard.JustDown(
        this.feedKeys.two
      )
    ) {
      if (this.inventory.remove("carrot")) {
        this.pet.feedCarrot();
        this.updateInventoryUI();
        this.updatePetUI();
      }
    }
  
    if (
      Phaser.Input.Keyboard.JustDown(
        this.feedKeys.three
      )
    ) {
      if (this.inventory.remove("nut")) {
        this.pet.feedNut();
        this.updateInventoryUI();
        this.updatePetUI();
      }
    }
  
    if (
      Phaser.Input.Keyboard.JustDown(
        this.feedKeys.four
      )
    ) {
      if (this.inventory.remove("berry")) {
        this.pet.feedBerry();
        this.updateInventoryUI();
        this.updatePetUI();
      }
    }
  }
}

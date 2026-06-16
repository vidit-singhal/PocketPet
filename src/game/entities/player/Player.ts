import Phaser from "phaser";

import {
  PLAYER_COLOR,
  PLAYER_SIZE,
  PLAYER_SMOOTHING,
  PLAYER_SPEED,
} from "@/game/entities/player/playerConfig";

/**
 * The player avatar. A placeholder rectangle for now.
 * Owns WASD input, smooth velocity, and world-bound clamping.
 */
export class Player {
  readonly sprite: Phaser.GameObjects.Rectangle;

  private velocityX = 0;
  private velocityY = 0;

  private readonly keys: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.add.rectangle(x, y, PLAYER_SIZE, PLAYER_SIZE, PLAYER_COLOR);
    this.sprite.setDepth(10);

    const keyboard = scene.input.keyboard;
    if (!keyboard) {
      throw new Error("Keyboard input is not available.");
    }

    this.keys = {
      W: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      A: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      S: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      D: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(delta: number, worldWidth: number, worldHeight: number) {
    let inputX = 0;
    let inputY = 0;

    if (this.keys.A.isDown) inputX -= 1;
    if (this.keys.D.isDown) inputX += 1;
    if (this.keys.W.isDown) inputY -= 1;
    if (this.keys.S.isDown) inputY += 1;

    if (inputX !== 0 && inputY !== 0) {
      const scale = 1 / Math.SQRT2;
      inputX *= scale;
      inputY *= scale;
    }

    const targetX = inputX * PLAYER_SPEED;
    const targetY = inputY * PLAYER_SPEED;
    const t = Phaser.Math.Clamp((delta / 1000) * PLAYER_SMOOTHING, 0, 1);

    this.velocityX += (targetX - this.velocityX) * t;
    this.velocityY += (targetY - this.velocityY) * t;

    const dt = delta / 1000;
    this.sprite.x += this.velocityX * dt;
    this.sprite.y += this.velocityY * dt;

    const halfSize = PLAYER_SIZE / 2;
    this.sprite.x = Phaser.Math.Clamp(
      this.sprite.x,
      halfSize,
      worldWidth - halfSize,
    );
    this.sprite.y = Phaser.Math.Clamp(
      this.sprite.y,
      halfSize,
      worldHeight - halfSize,
    );

    if (this.sprite.x <= halfSize && this.velocityX < 0) this.velocityX = 0;
    if (this.sprite.x >= worldWidth - halfSize && this.velocityX > 0) {
      this.velocityX = 0;
    }
    if (this.sprite.y <= halfSize && this.velocityY < 0) this.velocityY = 0;
    if (this.sprite.y >= worldHeight - halfSize && this.velocityY > 0) {
      this.velocityY = 0;
    }
  }
}

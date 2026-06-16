import Phaser from "phaser";

export class PetFollower {
  public sprite: Phaser.GameObjects.Arc;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number
  ) {
    this.sprite = scene.add.circle(
      x,
      y,
      12,
      0xffffff
    );
  }

  update(
    targetX: number,
    targetY: number,
    delta: number
  ) {
    const speed = 0.008 * delta;

    this.sprite.x = Phaser.Math.Linear(
      this.sprite.x,
      targetX,
      speed
    );

    this.sprite.y = Phaser.Math.Linear(
      this.sprite.y,
      targetY,
      speed
    );
  }
}
export class Pet {
    name: string;
    type: string;
  
    happiness: number;
    hunger: number;
    energy: number;
  
    constructor() {
      this.name = "Bunny";
      this.type = "🐰";
  
      this.happiness = 100;
      this.hunger = 100;
      this.energy = 100;
    }
  
    tick() {
      this.hunger = Math.max(0, this.hunger - 1);
      this.energy = Math.max(0, this.energy - 1);
    }
  }
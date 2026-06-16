export class Inventory {
    private items = {
      apple: 0,
      carrot: 0,
      nut: 0,
      berry: 0,
    };
  
    add(type: keyof typeof this.items) {
      this.items[type]++;
    }
  
    getItems() {
      return this.items;
    }
  }
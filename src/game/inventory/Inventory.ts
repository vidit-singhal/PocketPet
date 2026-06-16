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

  remove(type: keyof typeof this.items) {
    if (this.items[type] > 0) {
      this.items[type]--;
      return true;
    }

    return false;
  }

  getItems() {
    return this.items;
  }
}
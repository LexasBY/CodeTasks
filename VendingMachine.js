class VendingMachine {
    constructor() {
      this.products = {
        1: { name: "Cola", price: 25, quantity: 5 },
        2: { name: "Water", price: 15, quantity: 3 },
      };
  
      this.coins = { 1: 10, 5: 10, 10: 10, 25: 10 };
      this.balance = 0;
    }
  
    insertCoin(value) {
      if (![1, 5, 10, 25].includes(value)) {
        throw new Error("Invalid coin");
      }
      this.balance += value;
      this.coins[value] = (this.coins[value] || 0) + 1;
    }
  
    getProducts() {
      return Object.entries(this.products)
        .filter(([_, p]) => p.quantity > 0)
        .map(([id, p]) => ({ id, ...p }));
    }
  
    buyProduct(id) {
      const product = this.products[id];
      if (!product) throw new Error("No such product");
      if (product.quantity === 0) throw new Error("Out of stock");
      if (this.balance < product.price) throw new Error("Insufficient funds");
  
      this.balance -= product.price;
      product.quantity -= 1;
  
      const change = this.getChange(this.balance);
      this.balance = 0;
      return { item: product.name, change };
    }
  
    refund() {
      const change = this.getChange(this.balance);
      this.balance = 0;
      return change;
    }
  
    getChange(amount) {
      const result = {};
      const coinsAvailable = Object.keys(this.coins).map(Number).sort((a, b) => b - a);
  
      for (let coin of coinsAvailable) {
        while (amount >= coin && this.coins[coin] > 0) {
          amount -= coin;
          this.coins[coin] -= 1;
          result[coin] = (result[coin] || 0) + 1;
        }
      }
  
      if (amount > 0) throw new Error("Cannot return exact change");
      return result;
    }
  }
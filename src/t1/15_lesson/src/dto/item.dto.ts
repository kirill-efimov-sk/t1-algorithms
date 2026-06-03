export class Item {
    constructor(
        private name: string,
        private price: number,
        private quantity: number
    ) {}
    
    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getQuantity(): number { return this.quantity; }
}
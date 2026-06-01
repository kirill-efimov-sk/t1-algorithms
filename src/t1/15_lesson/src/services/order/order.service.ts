import type { Item } from "../dto";

export class OrderService {
    public calc(items: Item[], type: string): number {
        let s = 0;
        for (const i of items) {
            s += i.getPrice() * i.getQuantity();
        }

        if (type.includes("VIP")) {
            s = s * 0.9;
        }

        if (type.includes("NEW")) {
            s = s * 0.95;
        }

        if (s > 1000) {
            s = s - 50;
        }

        return s;
    }
}
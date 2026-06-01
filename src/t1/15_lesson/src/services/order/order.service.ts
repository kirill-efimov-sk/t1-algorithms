import type { Item } from "../../dto";

export class OrderService {
    /**
     * Calculates the total price for given items considering user type and discounts.
     * 
     * @param items - Array of items in the order.
     * @param type - User type code (e.g., 'VIP', 'NEW'). Case-sensitive.
     * @returns The final calculated total price.
     * @example
     * const total = service.calc(items, "VIP");
     */
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
import { GrossDiscountRule, TypeDiscountRule } from "./rules";
import type { Item } from "../../dto";
import type { DiscountRule } from "./rules/types";

const DEFAULT_PRECISION = 2;
const DEFAULT_RULES: DiscountRule[] = [
  new TypeDiscountRule(),
  new GrossDiscountRule()
];

export class OrderService {
    private discountRules: DiscountRule[];

    constructor(discountRules: DiscountRule[] = [...DEFAULT_RULES]) {
        this.discountRules = [...discountRules]; // ensuring immutability
    }

    /**
     * Price calculation taking into account type and discounts.
     * 
     * @param items - Array of Item (dto) in the order.
     * @param type - Type code (e.g., 'VIP', 'NEW'). Case-sensitive.
     * @returns The final calculated total price.
     * @example
     * const total = service.calc(items, 'VIP');
     */
    public calc(items: Item[], type: string): number {
        this.validateItems(items);
        this.validateType(type);

        const totalPrice = this.calculateTotalPrice(items)
        const totalQuantity = this.calculateTotalQuantity(items)

        const finalPrice = this.discountRules.reduce(
            (price, rule) => rule.apply({price, type, totalQuantity}),
            totalPrice
        );

        return this.roundPrice(finalPrice);
    }

    /**
     * Adding new rules
     * 
     * @param rule - Added new rule
     * @returns void or Error
     * @example
     * service.addRule(new BirthdayDiscount());
     */
    public addRule(rule: DiscountRule): void {
        this.ensureRuleIsUnique(rule);

        this.discountRules = [...this.discountRules, rule];
    }

    /**
     * Deleting a rule by reference
     * 
     * @param rule - Deleted rule
     * @returns void or Error
     * @example
     * service.deleteRule(rule);
     */
    public deleteRule(rule: DiscountRule): void {
        this.ensureRuleExists(rule);

        this.discountRules = this.discountRules.filter(r => r !== rule);
    }

    private calculateTotalPrice(items: Item[]): number {
        return items.reduce((sum, item) => sum + item.getPrice() * item.getQuantity(), 0);
    }
    private calculateTotalQuantity(items: Item[]): number {
        return items.reduce((sum, item) => sum + item.getQuantity(), 0);
    }
    private roundPrice(price: number): number {
        const multiplier = Math.pow(10, DEFAULT_PRECISION);
        return Math.round(price * multiplier) / multiplier;
    }
    private hasRule(rule: DiscountRule): boolean {
        return this.discountRules.includes(rule);
    }

    // Entity validators 
    private validateItems(items: Item[]): void {
        if (!items || !Array.isArray(items)) throw new Error('Items cannot be null or undefined');
    }
    private validateType(type: string): void {
        if (!type) throw new Error('Type cannot be null or undefined');
    }
    private ensureRuleIsUnique(rule: DiscountRule): void {
        if (this.hasRule(rule)) throw new Error('Rule already exists');
    }
    private ensureRuleExists(rule: DiscountRule): void {
        if (!this.hasRule(rule)) throw new Error('Rule not found');
    }
}
import type { DiscountContext, DiscountRule } from "./types";

const DEFAULT_GROSS_THRESHOLD = 1000;
const DEFAULT_GROSS_DISCOUNT = 50;

export class GrossDiscountRule implements DiscountRule {
  constructor(
    private readonly threshold: number = DEFAULT_GROSS_THRESHOLD,
    private readonly discount: number = DEFAULT_GROSS_DISCOUNT
  ) {}

  apply(context: DiscountContext): number {
    return context.price > this.threshold ? context.price - this.discount : context.price;
  }
}
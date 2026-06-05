import { Observer } from "../observer/observer";
import type { Calculator } from "../model/calculator";
import type { Data } from "../dto/calculator.dto";

/**
 * ViewModel that orchestrates calculator operations and view notifications.
 * @extends Observer
 */
export class CalculatorViewModel extends Observer {
    private calculator: Calculator;
    private currentData: Data<number> | null = null;

    constructor(calculator: Calculator) {
        super();
        this.calculator = calculator;
    }

    /**
     * @returns Current calculation data or null
     */
    public getCurrentData(): Data<number> | null {
        return this.currentData;
    }

    /**
     * Performs the operation and notifies subscribers of completion.
     * @param data - Operation data: new Data<number>(operandA, operandB, operation)
     * @emits 'operation complete'
     */
    public perform(data: Data<number>): void {
        try {
            this.currentData = data;
            this.calculator.makeOperation(data);
            this.notify("operation complete");
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error: ${error.message}`);
            } else {
                console.error('Unknown error occurred:', error);
            }
        }
    }
}
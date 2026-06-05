import { Observer } from "../observer/observer";
import type { Operation } from "./types";
import type { Data } from "../dto/calculator.dto";

/**
 * Main calculator class for arithmetic operations.
 * Extends Observer to notify subscribers when calculations are completed.
 * @extends Observer
 * @example
 * const calculator = new Calculator();
 */
export class Calculator extends Observer {
    private operationMap = new Map<string, Operation<number>> ();
    private result: number = 0;

    /**
     * Registers a new operation.
     * @param data - Operation data: new Data<number>(operandA, operandB, operation)
     * @throws {Error} If operation already exists
     */
    public makeOperation(data: Data<number>): void {
        const operation = this.operationMap.get(data.getOperation());
        
        if (!operation) {
            throw new Error(`Operation "${data.getOperation()}" not found`);
        }
        
        this.result = operation.perform(data);
        data.setResult(this.result);
        this.notify('onResult');
    }

    /**
     * Registers a new operation.
     * @param name - Operation name
     * @param operation - New operation
     * @throws {Error} If operation already exists
     */
    public addOperation(name: string, operation: Operation<number>): void {
        if (this.operationMap.has(name)) {
            throw new Error(`Operation "${name}" already exists`);
        }
        this.operationMap.set(name, operation);
    }

    public getResult(): number {
        return this.result;
    }
}

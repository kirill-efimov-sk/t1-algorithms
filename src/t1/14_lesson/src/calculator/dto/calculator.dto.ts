export class Data<T> {
    operandA: number = 0;
    operandB: number = 0;
    operation: string = '';
    result: number = 0;

    constructor(param1: number | Data<T>, param2?: number, operation?: string) {
         if (param1 instanceof Data) {
            this.operandA = param1.operandA;
            this.operandB = param1.operandB;
            this.operation = param1.operation;
            this.result = param1.result;
        } else if (typeof param1 === 'number' && param2 !== undefined && operation !== undefined) {
            this.operandA = param1;
            this.operandB = param2;
            this.operation = operation;
        } else {
            throw new Error('Invalid constructor parameters');
        }
    }

    getOperation(): string {
        return this.operation;
    }

    getResult(): number {
        return this.result;
    }

    getOperandA(): number {
        return this.operandA;
    }

    getOperandB(): number {
        return this.operandB;
    }

    setOperation(operation: string): void {
        this.operation = operation;
    }

    setResult(result: number): void {
        this.result = result;
    }

    setOperandA(operandA: number): void {
        this.operandA = operandA;
    }

    setOperandB(operandB: number): void {
        this.operandB = operandB;
    }
}
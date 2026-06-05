import type { CalculatorViewModel } from "../viewmodel/calculatorViewModel";

export class ConsoleWriter {
    private readonly calculatorViewModel: CalculatorViewModel;

    constructor(calculatorViewModel: CalculatorViewModel) {
        this.calculatorViewModel = calculatorViewModel;
        this.calculatorViewModel.subscribe("operation complete", {
            invoke: () => this.write()
        });
    }

    public write(): void {
        const data = this.calculatorViewModel.getCurrentData();
        if(data) {
            console.log(`${data.getOperandA()}${data.getOperation()}${data.getOperandB()}=${data.getResult()}`);
        }
    }
}
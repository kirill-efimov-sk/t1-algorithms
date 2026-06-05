
import { Data } from '../dto/calculator.dto';
import type { CalculatorViewModel } from '../viewmodel/calculatorViewModel';
import { consoleReadline } from '../../utils/console';


export class ConsoleReader {
    private calculatorViewModel: CalculatorViewModel;

    constructor(calculatorViewModel: CalculatorViewModel) {
        this.calculatorViewModel = calculatorViewModel;
    }

    async read(): Promise<void> {
        while (true) {
            const xStr = await consoleReadline.read('Введите первый операнд: ');
            const operandA = parseInt(xStr, 10);
            
            const yStr = await consoleReadline.read('Введите второй операнд: ');
            const operandB = parseInt(yStr, 10);
            
            const operation = await consoleReadline.read('Введите операцию (+, -, *, /): ');
            
            const data: Data<number> = new Data<number>(operandA, operandB, operation);
            this.calculatorViewModel.perform(data);
        }
    }
}

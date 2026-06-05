import { Calculator } from "./model/calculator";
import { operations, OperationsRegister } from "./operations";
import { ConsoleReader } from "./view/consoleReader";
import { ConsoleWriter } from "./view/consoleWriter";
import { CalculatorViewModel } from "./viewmodel/calculatorViewModel";

const calculator = new Calculator();
const operationsRegister  = new OperationsRegister(calculator, operations)
console.log('Доступные операции:', operationsRegister.getAvailableOperations());

const viewModel  = new CalculatorViewModel(calculator);
const reader = new ConsoleReader(viewModel);
const writer = new ConsoleWriter(viewModel);

reader.read();
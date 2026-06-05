import { OperationsRegister } from './operationsRegister';
import { OperationsFactory } from "./operationsFactory";
import type { Operation } from "../model/types";

const operations = new Map<string, Operation<number>>([
    ['+', OperationsFactory.operationAdd()],
    ['-', OperationsFactory.operationSubtract()],
    ['*', OperationsFactory.operationMultiply()],
    ['/', OperationsFactory.operationDivide()]
]);

export {operations, OperationsRegister};
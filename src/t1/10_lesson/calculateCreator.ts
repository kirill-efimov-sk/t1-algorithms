type BinaryOperation = (x: number, y: number) => number;
type Operations = Map<string, BinaryOperation>;
type Model = {
    operation: string;
    x: number;
    y: number;
    result: number;
};
type Env = {
    readonly operations: Operations;
    readonly printer: (model: Model) => void;
};

// Хранилище операций
const env: Env = {
    operations: new Map([
        ["+", (x, y) => x + y],
        ["-", (x, y) => x - y],
        ["*", (x, y) => x * y],
        ["/", (x, y) => x / y],
    ]),
    printer: (m) => console.log(`${m.x}${m.operation}${m.y}=${m.result}`),
};

// ФП: чистые функции, композиция, каррирование + env dependency pull
const calculateCreator =
    (env: Env) =>
    (operation: string, x: number, y: number): number => {
        const op = env.operations.get(operation);
        if (!op) throw new Error(`Operation ${operation} not supported`);

        const result = op(x, y);

        env.printer({ operation, x, y, result });
        return result;
    };

const operationBuilder =
    (env: Env) =>
    (symbol: string, operation: BinaryOperation): Env => {
        if (env.operations.has(symbol)) throw new Error("Exists");

        // Возвращаем копию окружения с новой картой операци (иммутабельность)
        return {
            ...env,
            operations: new Map([...env.operations, [symbol, operation]]),
        };
    };

const calculate = calculateCreator(env);
const addCalculateOperation = operationBuilder(env);

// Экспортируем функции для использования в других модулях
export { calculate, addCalculateOperation };

// ТЕСТЫ
const newEnv = addCalculateOperation("%", (x: number, y: number) => x % y); // НОС
const advancedCalculate = calculateCreator(newEnv);

calculate("+", 10, 5);
calculate("-", 10, 5);
calculate("*", 10, 5);
calculate("/", 10, 5);

advancedCalculate("%", 11, 5); //для calculate - Uncaught Error Error: Operation % not supported

/* output:
 * 10+5=15
 * 10-5=5
 * 10*5=50
 * 10/5=2
 * 11%5=1
 */

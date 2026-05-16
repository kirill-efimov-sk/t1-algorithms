// Практическое задание №1;

type EdgeStruct = {
    capacity: number; // МБ
    rate: number; // %
};

class Edge {
    public from: string;
    public to: string;
    public val: EdgeStruct;

    constructor(from: string, to: string, val: EdgeStruct) {
        this.from = from;
        this.to = to;
        this.val = val;
    }
}

class Matrix {
    protected _edges: Edge[];

    constructor(edges: Edge[]) {
        this._edges = [...edges];
    }

    getEdges(): readonly Edge[] {
        return this._edges;
    }
}

class NodeStruct {
    protected readonly name: string;
    protected connections: Map<string, EdgeStruct>;

    constructor(name: string) {
        this.name = name;
        this.connections = new Map();
    }

    addStruct(toNode: NodeStruct, val: EdgeStruct): void {
        this.connections.set(toNode.name, val);
    }
}

/*
 * Задание 1: Матричный подходы
 */
class MatrixArray extends Matrix {
    public matrixNet = (): (EdgeStruct | null)[][] => {
        const verticesSet = new Set<string>();
        const edges = this.getEdges();

        edges.forEach((edge) => {
            verticesSet.add(edge.from);
            verticesSet.add(edge.to);
        });

        // Преобразуем Set в массив и сортируем A до N
        const vertices = Array.from(verticesSet).sort();

        // Индексируем вершины для удобства доступа к матрице
        const vertexIndex = new Map<string, number>();
        vertices.forEach((vertex, index) => {
            vertexIndex.set(vertex, index);
        });

        // Создаём матрицу N x N, заполненную null
        const matrix: (EdgeStruct | null)[][] = Array.from(
            { length: vertices.length },
            () => new Array(vertices.length).fill(null),
        );

        // Заполняем матрицу значениями из рёбер
        edges.forEach((edge) => {
            const fromIdx = vertexIndex.get(edge.from);
            const toIdx = vertexIndex.get(edge.to);

            if (fromIdx !== undefined && toIdx !== undefined) {
                matrix[fromIdx][toIdx] = edge.val;
                matrix[toIdx][fromIdx] = edge.val;
            }
        });

        return matrix;
    };
}

/*
 * Задание 2: Подход с использованием связанных узлов (NodeStruct, как имитация Node)
 */
class MatrixNode extends Matrix {
    public nodesNet = (): Map<string, NodeStruct> => {
        // Временное хранилище для связи имен узлов с объектами NodeStruct
        const nodesMap = new Map<string, NodeStruct>();
        const edges = this.getEdges();

        // Cоздаем узлы
        edges.forEach((edge) => {
            if (!nodesMap.has(edge.from)) {
                nodesMap.set(edge.from, new NodeStruct(edge.from));
            }
            if (!nodesMap.has(edge.to)) {
                nodesMap.set(edge.to, new NodeStruct(edge.to));
            }
        });

        // Устанавливаем связи между узлами
        edges.forEach((edge) => {
            const fromNode = nodesMap.get(edge.from);
            const toNode = nodesMap.get(edge.to);

            if (fromNode && toNode) {
                fromNode.addStruct(toNode, edge.val);
                toNode.addStruct(fromNode, edge.val);
            }
        });

        return nodesMap;
    };
}

const edges: Edge[] = [
    new Edge("A", "B", { capacity: 1500, rate: 0.9 }),
    new Edge("A", "C", { capacity: 2000, rate: 0.1 }),
    new Edge("A", "D", { capacity: 1000, rate: 0.5 }),
    new Edge("B", "F", { capacity: 1500, rate: 0.6 }),
    new Edge("C", "F", { capacity: 500, rate: 0.2 }),
    new Edge("C", "E", { capacity: 900, rate: 0.05 }),
    new Edge("D", "E", { capacity: 2500, rate: 0.01 }),
    new Edge("E", "F", { capacity: 300, rate: 0.85 }),
];

const matrixArray = new MatrixArray(edges);
const matrixNode = new MatrixNode(edges);

const array = matrixArray.matrixNet();
const nodes = matrixNode.nodesNet();

console.log(array, nodes);

/*
 * output (двунаправленные связи учтены, граф неориентированный + для удобства мы индексируем вершины от A до N):
 * arg (6) [Array(6), Array(6), Array(6), Array(6), Array(6), Array(6)]
 *
 * 0 = (6) [null, {…}, {…}, {…}, null, null]
 * 1 = (6) [{…}, null, null, null, null, {…}]
 * 2 = (6) [{…}, null, null, null, {…}, {…}]
 * 3 = (6) [{…}, null, null, null, {…}, null]
 * 4 = (6) [null, null, {…}, {…}, null, {…}]
 * 5 = (6) [null, {…}, {…}, null, {…}, null]
 *
 * arg = Map(6) {size: 6, A => NodeStruct {n…, …}, B => NodeStruct {n…, …}, C => NodeStruct {…}, D => NodeStruct {…}, F => NodeStruct {…}, …}
 * 0 = {"A" => NodeStruct}
 * key = 'A'
 * value = NodeStruct {name: 'A', connections: Map(3)}
 * 1 = {"B" => NodeStruct}
 * key = 'B'
 * value = NodeStruct {name: 'B', connections: Map(2)}
 * 2 = {"C" => NodeStruct}
 * key ='C'
 * value = NodeStruct {name: 'C', connections: Map(3)}
 * 3 = {"D" => NodeStruct}
 * key = 'D'
 * value = NodeStruct {name: 'D', connections: Map(2)}
 * 4 = {"F" => NodeStruct}
 * key = 'F'
 * value = NodeStruct {name: 'F', connections: Map(3)}
 * 5 = {"E" => NodeStruct}
 * key = 'E'
 * value = NodeStruct {name: 'E', connections: Map(3)}
 *
 */

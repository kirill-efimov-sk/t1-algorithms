class Element<T> {
    value: T;
    prev: Element<T> | null = null;
    next: Element<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

// Двусвязный список
class LinkedList<T> {
    private first: Element<T> | null = null;
    private last: Element<T> | null = null;
    private size: number = 0;

    // ========== Вставка за O(1) ==========
    // вставка в начало
    addFirst(value: T): Element<T> {
        const element = new Element(value);

        element.next = this.first;
        if (this.first !== null) {
            this.first.prev = element;
        }

        this.first = element;
        if (this.last === null) {
            this.last = element;
        }

        this.size++;
        return element;
    }

    // вставка в конец
    addLast(value: T): Element<T> {
        const element = new Element(value);

        element.prev = this.last;
        if (this.last !== null) {
            this.last.next = element;
        }

        this.last = element;
        if (this.first === null) {
            this.first = element;
        }

        this.size++;
        return element;
    }

    // вставка ПОСЛЕ указанного узла
    insertAfter(node: Element<T>, value: T): Element<T> {
        const current = node as Element<T>;
        const element = new Element(value);

        element.next = current.next;
        element.prev = current;

        if (current.next !== null) {
            current.next.prev = element;
        }

        current.next = element;
        if (current === this.last) {
            this.last = element;
        }

        this.size++;
        return element;
    }

    // ========== Поиск за O(N) ==========
    contains(value: T): boolean {
        return this.indexOf(value) !== -1;
    }

    // ========== Поиск позиции за O(N) ==========
    indexOf(value: T): number {
        let current = this.first;
        let index = 0;

        while (current !== null) {
            if (current.value === value) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    // ========== Удаление за O(1) ==========
    removeFirst(): void {
        if (this.first === null) return;

        this.first = this.first.next;
        if (this.first !== null) {
            this.first.prev = null;
        } else {
            this.last = null;
        }

        this.size--;
    }

    removeLast(): void {
        if (this.last === null) return;

        this.last = this.last.prev;
        if (this.last !== null) {
            this.last.next = null;
        } else {
            this.first = null;
        }

        this.size--;
    }

    remove(node: Element<T>): void {
        const element = node as Element<T>;

        if (element === this.first) {
            this.removeFirst();
            return;
        }

        if (element === this.last) {
            this.removeLast();
            return;
        }

        // Удаление из середины
        if (element.prev !== null) {
            element.prev.next = element.next;
        }
        if (element.next !== null) {
            element.next.prev = element.prev;
        }

        this.size--;
    }

    // ========== Получение значения по позиции за O(1) ==========
    get(node: Element<T>): T {
        return node.value;
    }

    // ========== Замена значения по позиции за O(1) ==========
    set(node: Element<T>, value: T): void {
        node.value = value;
    }
}

export { LinkedList };

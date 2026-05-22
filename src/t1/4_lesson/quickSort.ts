function median(arr: number[], a: number, b: number, c: number): number {
    const x = arr[a],
        y = arr[b],
        z = arr[c];

    // Сумма трех чисел минус самое большое и самое маленькое из них дает медиану.
    return x + y + z - Math.max(x, y, z) - Math.min(x, y, z);
}

// Экспортируем функцию для использования в тестах быстрой сортировки
export function quickSort(arr: number[]): number[] {
    if (!arr || arr.length <= 1) return arr;

    const stack: [number, number][] = [[0, arr.length - 1]]; // границы первого подмассива

    while (stack.length) {
        const item = stack.pop();
        if (!item) break;

        const [low, high] = item;
        // Если подмассив из одного элемента или пустой, считаем его отсортированным
        if (low >= high) continue;

        const mid = low + Math.floor((high - low) / 2);
        const pivot = median(arr, low, mid, high);
        // Трехпутевое разбиение lt, gt, i (i в for)
        let lt = low; // граница меньших
        let gt = high; // граница больших

        for (let i = low; i <= gt; i++) {
            if (arr[i] < pivot) {
                // Меняем местами arr[i] и arr[lt], так как arr[i] меньше pivot, а arr[lt] - это граница меньших
                [arr[lt], arr[i]] = [arr[i], arr[lt]];
                lt++;
            } else if (arr[i] > pivot) {
                // Меняем местами arr[i] и arr[gt], так как arr[i] больше pivot, а arr[gt] - это граница больших
                [arr[i], arr[gt]] = [arr[gt], arr[i]];
                gt--;
                i--; // Проверяем элемент, который пришел с конца
            }
            // Если равно pivot - ничего не делаем, просто идем дальше
        }

        // Оптимизация: сначала добавляем меньший подмассив, затем больший (экономия памяти стека)
        if (lt - low < high - gt) {
            stack.push([low, lt - 1]);
            stack.push([gt + 1, high]);
        } else {
            stack.push([gt + 1, high]);
            stack.push([low, lt - 1]);
        }
    }

    return arr;
}

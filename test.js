function insertSort(arr) {
    // console.log(arr);
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i]
        let j = i - 1
        for (; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j]
        }
        // 
        arr[j + 1] = temp
    }
    return arr
}

// console.log(insertSort([12, 3, 123, 213, 2143, 12, 421, 4]));

function shellSort(arr) {
    let n = arr.length,
        d = n
        // 
    while (d > 1) {
        d = Math.floor(d / 2)
        for (let i = d; i < n; i++) {
            let temp = arr[i]
            let j = i - d
            for (; j >= 0 && arr[j] > temp; j = j - d) {
                arr[j + d] = arr[j]
            }
            arr[j + d] = temp
        }

    }
    return arr
}

// console.log(shellSort([12135, 43, 15, 435, 432, 64256, 123, 123]));

function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
        // temp = arr[i];
        // arr[i] = arr[minIndex];
        // arr[minIndex] = temp;
    }

    return arr
}

// console.log(selectSort([123, 21, 41, 325, 1346, 4326, 1]));

function heapSort(arr) {
    // 建堆
    let n = arr.length
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        heapify(arr, i, n)
    }

    // 堆排序
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]]
        n--
        heapify(arr, 0, n)
    }


    return arr
}
function heapify(arr, i, n) {
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i
    if (left < n && arr[left] > arr[largest]) {
        largest = left
    }
    if (right < n && arr[right] > arr[largest]) {
        largest = right
    }
    if (largest !== i) {
        [arr[largest], arr[i]] = [arr[i], arr[largest]]
        heapify(arr, largest)
    }

}

// console.log(heapSort([12, 3214, 31425, 436, 5436, 123]));

function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    }
    return arr
}

console.log(bubbleSort([123, 24, 124, 525, 436, 34565, 476547, 1]));
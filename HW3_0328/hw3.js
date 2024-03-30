const func1 = (num) => {
    const arr = (""+num).split('').reverse();
    return arr.join('');
}

const func2 = (text) => {
    const arr = text.split('').reverse();
    const reversedText = arr.join('');
    return text === reversedText;
}

const func3 = (text) => {
    const set = new Set();
    for (let i = 0; i < text.length; i++) {
        for (let j = i+1; j <= text.length; j++) {
            set.add(text.substring(i, j));
        }
    }
    return [...set];
}

const func4 = (text) => {
    const arr = text.split('');
    arr.sort();
    return arr.join('');
}

const func5 = (text) => {
    const words = text.split(' ');
    const newWords = words.map(word => word[0].toUpperCase()+word.substring(1));
    return newWords.join(' ');
}

const func6 = (text) => {
    const words = text.split(' ');
    let max = 0;
    let idx = -1;
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > max) {
            max = words[i].length;
            idx = i;
        }
    }
    return words[idx];
}

const func7 = (text) => {
    const newText = text.toUpperCase();
    const vowels = "AEIOU";
    let cnt = 0;
    for (let i = 0; i < newText.length; i++) {
        if (vowels.includes(newText[i]))
            cnt++;
    }
    return cnt;
}

const func8 = (num) => {
    if (num < 2)
        return false;
    if (num === 2)
        return true;
    if (num % 2 === 0)
        return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0)
            return false;
    }
    return true;
}

const func9 = (x) => {
    return typeof(x);
}

const func10 = (n) => {
    const res = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j <= n; j++) {
            row.push(i === j ? 1 : 0);
        }
        res.push(row);
    }
    return res;
}


const func11 = (arr) => {
    arr.sort();
    return [arr[1], arr[arr.length-2]];
}

const func12 = (num) => {
    let sum = 0;
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            sum += i;
            if (i != 1 && i*i != num)
                sum += num/i;
        }
    }
    return sum === num;
}

const func13 = (num) => {
    const res = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i == 0) {
            res.push(i);
            if (i*i != num)
                res.push(num/i);
        }
    }
    return res;
}

const func14 = (target, coins) => {
    const result = [];
    function backtrack(startIndex, currentCombination, currentSum) {
        if (currentSum === target) {
            result.push([...currentCombination]);
            return;
        }
        if (currentSum > target) {
            return;
        }
        for (let i = startIndex; i < coins.length; i++) {
            currentCombination.push(coins[i]);
            backtrack(i, currentCombination, currentSum + coins[i]);
            currentCombination.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}

const func15 = (b, n) => {
    return Math.pow(b, n);
}

const func16 = (text) => {
    let res = "";
    for (let i = 0; i < text.length; i++) {
        if (!res.includes(text[i]))
            res += text[i];
    }
    return res;
}

const func17 = (text) => {
    const map = new Map();
    for (let i = 0; i < text.length; i++) {
        map.set(text[i], map.has(text[i]) ? map.get(text[i])+1 : 1);
    }
    return map;
}

const func18 = (arr, target) => {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right)/2);
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

const func19 = (arr, num) => {
    const res = [];
    for (let iter of arr) {
        if (iter > num) 
            res.push(iter);
    }
    return res;
}

const func20 = (n) => {
    const sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < n; i++) {
        res += sample[Math.floor(sample.length*Math.random())];
    }
    return res;
}

const func21 = (arr, size) => {
    const result = [];
    function backtrack(startIndex, currentCombination, currentSize) {
        if (currentSize === size) {
            result.push([...currentCombination]);
            return;
        }
        if (currentSize > size) {
            return;
        }
        for (let i = startIndex; i < arr.length; i++) {
            currentCombination.push(arr[i]);
            backtrack(i+1, currentCombination, currentSize + 1);
            currentCombination.pop();
        }
    }
    backtrack(0, [], 0);
    return result;
}

const func22 = (text, letter) => {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] === letter)
            count++;
    }
    return count;
}

const func23 = (text) => {
    const map = new Map();
    for (let i = 0; i < text.length; i++) {
        map.set(text[i], map.has(text[i]) ? map.get(text[i])+1 : 1);
    }
    for (let i = 0; i < text.length; i++) {
        if (map.get(text[i]) == 1)
            return text[i];
    }
    return "";
}

const func24 = (arr) => {
    for (let i = arr.length-1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

const func25 = (words) => {
    let max = -1;
    let idx = 0;
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.length > max) {
            max = word.length;
            idx = i;
        }
    }
    return words[idx];
}

const func26 = (text) => {
    let left = 0, right = 0, bestLeft = 0, bestRight = 0;
    const map = new Map();
    while (right < text.length) {
        map.set(text[right], map.has(text[right]) ? map.get(text[right])+1 : 1);
        while (map.get(text[right]) != 1) {
            map.set(text[left], map.get(text[left]) - 1);
            left++;
        }
        right++;
        if (right - left > bestRight - bestLeft) {
            bestLeft = left;
            bestRight = right;
        }
    }
    return text.substring(bestLeft, bestRight);
}

const func27 = (text) => {
    let max = 0;
    const res = new Set();
    for (let i = 0; i < text.length; i++) {
        let left = i, right = i;
        while (left >= 0 && right < text.length && text[left] === text[right]) {
            if (right - left + 1 > max) {
                max = right - left + 1;
                res.clear();
                res.add(text.substring(left, right+1));
            } else if (right - left + 1 == max) {
                res.add(text.substring(left, right+1));
            }
            left--;
            right++;
        }
    }
    return [...res];
}

const func28 = (a,b) => {
    // Please use func25 as a, func6 as b.
    return(b(a(["Australia", "Germany", "United States of America"])));
}

const func29 = (func) => {
    return func.name;
}

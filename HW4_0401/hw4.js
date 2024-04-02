Array.prototype.myFilter = function(callback)  {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) == true)
            res.push(this[i]);
    }
    return res;
}

const arr1 = [-12,20,17,19,0];

const callback1 = (x) => {
    return x > 18;
}

console.log(arr1.filter(callback1));
console.log(arr1.myFilter(callback1));

Array.prototype.myReduce = function(callback)  {
    let res = 0;
    for (let i = 0; i < this.length; i++) {
        res = callback(res, this[i]);
    }
    return res;
}

const arr2 = [-12,20,17,19,0];

const callback2 = (pre, cur) => {
    return pre + cur;
}

console.log(arr2.reduce(callback2));
console.log(arr2.myReduce(callback2));
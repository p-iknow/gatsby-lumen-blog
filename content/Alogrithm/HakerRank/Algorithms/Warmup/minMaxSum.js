function miniMaxSum(arr) {
    const minArr = arr.map(v => v);
    const maxArr = arr.map(v => v);
    minArr.splice(minArr.indexOf(Math.max(...arr)),1)
    const resMin = minArr.reduce((prev, curr) => prev + curr);
    maxArr.splice(maxArr.indexOf(Math.min(...arr)), 1)
    const resMax = maxArr.reduce((prev, curr) => prev + curr);
    console.log(resMin, resMax)
}

miniMaxSum([1,2,3,4,5]);
https://www.hackerrank.com/challenges/diagonal-difference/problem

// Complete the diagonalDifference function below.
function diagonalDifference(arr) {
    let t = 0 
    for (let i = 0; i < arr.length; i++){
        t = arr[i][i] - arr[i][arr.length -1 - i]
    } 
    return Math.abs(t)
}
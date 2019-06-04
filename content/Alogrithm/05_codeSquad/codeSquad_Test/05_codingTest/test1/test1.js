function solution(arr) {
    var first = arr.filter((v, i) => v == arr[i + 1]);
    return  first.filter((v, i) => v !== first[i + 1]);
 }


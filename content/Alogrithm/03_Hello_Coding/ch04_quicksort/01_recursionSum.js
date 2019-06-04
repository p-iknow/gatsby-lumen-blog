function recuresionSum (arr){
    var arrLength = arr.length;
    if (arrLength < 2 ) return arr[0];
    else return arr[0] + recuresionSum(arr.slice(1))
}

recuresionSum([1,2,3]);
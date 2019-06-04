//중복 체크 함수 
function hasDuplicates(array) { 
    return (new Set(array)).size !== array.length; 
} 

//페어만 따로 모은 배열을 리턴한는 함수 
function getPair(arr) {
    var result = [];
    for (var i in arr) {
        if (!(arr[i] in result))
            result[arr[i]] = [];
        result[arr[i]].push(arr[i]);
    }
    return result.filter(x => x)
}

// 페어중 가장 높은 페어를 리턴하는 함수
function findMax(arr){
    return arr.reduce( function (previous, current) { 
        return previous.length > current.length ? previous:current;
    })
}


// 최종비교값을 얻는 과정을 포함한 sub 함수 
function sub(arr){
    if(hasDuplicates(arr)){
        return findMax(getPair(arr));
    } else{
        return []
    }
}

// 두 배열을 페어를 비교하는 함수 
function compare(arr1, arr2){
    if(arr1.length > arr2.length){
        return 1;  
    } else if(arr1.length < arr2.length){
        return 2;
    } else {
        if(arr1[0] > arr2[0]) {
            return 1;
        } else if(arr1[0] < arr2[0]) {
            return 2;
        } else {
            return 0;
        }
    }
}

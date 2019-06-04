
if (Array.isArray(arr)) {
    console.error("your input argument is not array);
} 

function quickSort(arr){ 
    
    var arrLength = arr.length;
    if (arrLength < 2) {
        return arr;
    } else {
        var pivot = arr[0], less = [], greater = [];
        for (var i=1; i < arrLength; i++) {
            if (arr[i] < pivot) less.push(arr[i]);
            else if (arr[i] > pivot) greater.push(arr[i]); 
        }
        return [...quickSort(less), pivot, ...quickSort(greater)] 
    }
}
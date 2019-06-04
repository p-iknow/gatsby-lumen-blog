//가장 작은 수를 찾는 함수
function findSmallest(arr) {
   var smallest = arr[0], smallestIndex = 0, length = arr.length;
   for (var i=1; i<length; i++ ) {
       if(arr[i] < smallest) {
           smallest = arr[i];
           smallestIndex = i;
       }
   }
   return smallestIndex; 
}

function selectionSort(arr) {
    var smallest, newArr = [], length = arr.length
    for (var i=0; i<length; i++) {
        smallest = findSmallest(arr);
        newArr.push(arr.splice(smallest, 1)[0]);
    }
    return newArr;
}


selectionSort([6,7,3,9,2,1]);
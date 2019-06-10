// function adjacentElementsProduct(inputArray) {
//     if (inputArray.length < 3) {return inputArray[0] * inputArray[1];}
//     let res; 
//     inputArray.forEach((el, i, arr,) => {
//         if (i === 1 ) {res = el * arr[i-1]}
//         if ( 1 < i a ) { 
//             res = res < (el * arr[i - 1]) ? el * arr[i -1] : res;        
//         }   
//     })
//     return res;
// }

function adjacentElementsProduct(inputArray) {
    return Math.max(...inputArray.slice(1).map((x, i) => x = x * inputArray[i]))}

adjacentElementsProduct([-1,2,3,4,5,6,65,2,3])
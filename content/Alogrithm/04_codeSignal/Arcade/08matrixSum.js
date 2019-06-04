let matrix = [[0, 1, 1, 2], 
              [0, 5, 0, 0], 
              [2, 0, 3, 3]];

let arr =[];              
let sum = 0;
for(let i=0; i<matrix.length; i++){
    for (let j=0; j<matrix[i].length; j++) {
         if (!arr.includes(j)){
             if(matrix[i][j]===0){
                 arr.push(j)
             } else {
                 sum += matrix[i][j]
             }
         }
    }
}

// https://www.acmicpc.net/problem/10430

// var fs = require('fs');
// //
// var input = fs.readFileSync('/dev/stdin').toString().split(" ").map(v => parseInt(v));
// //첫째 줄에 (A+B)%C, 둘째 줄에 (A%C + B%C)%C, 셋째 줄에 (A×B)%C, 넷째 줄에 (A%C × B%C)%C를 출력한다. 
// var [A, B, C] = input
// console.log((A+B)%C);
// console.log((A%C + B%C)%C);
// console.log((A*B)%C);
// console.log((A%C * B%C)%C);

var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split(' ');
var a = parseInt(input[0]);
var b = parseInt(input[1]);
var c = parseInt(input[2]);
console.log( (a+b)%c );
console.log( (a%c + b%c)%c );
console.log( (a*b)%c );
console.log( (a%c * b%c)%c );
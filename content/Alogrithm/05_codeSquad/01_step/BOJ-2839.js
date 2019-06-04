// https://www.acmicpc.net/status?user_id=apricotsoul&problem_id=2839&from_mine=1

var fs = require('fs');
var a = fs.readFileSync('/dev/stdin');
var a =5
var big = Math.floor(a / 5);
var q = a % 5;
var small = 0;
switch( q ) {
    case 1: big--; small = 2; break;
    case 2: big -= 2; small = 4; break;
    case 3: small = 1; break;
    case 4: big--; small = 3; break;
}
if( big < 0 || small < 0 ) {
    console.log( -1 );
}
else {
    console.log( big + small );
}
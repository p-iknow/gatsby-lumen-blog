a = [-1, 150, 190, 170, -1, -1, 160, 180]
let mindex = [];
a.forEach((el, i) => {
    if (el === -1) {mindex.push(i)}    
});
while ( -1 < a.indexOf(-1) ){
    a.splice(a.indexOf(-1), 1)
}
const res = a.sort(function(a,b) {return a -b})
if( mindex.length  === 0) return res;
for (let v of mindex) {res.splice(v,0, -1)}
return res;
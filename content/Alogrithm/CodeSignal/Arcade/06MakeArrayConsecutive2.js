function makeArrayConsecutive2(statues) {
    if(statues.length === 1) {
        return 0;
    }
    let sortedArr = statues.sort(function(a, b) {
        return a - b;
      });
    let low = sortedArr[0], max = sortedArr[sortedArr.length-1], res =[];
    for(let i = low+1; i < max ;i++){
        if(!sortedArr.includes(i)) {
            res.push(i);
        }
    }
    return res.length;
}
makeArrayConsecutive2([1,2,3,6,7,8])
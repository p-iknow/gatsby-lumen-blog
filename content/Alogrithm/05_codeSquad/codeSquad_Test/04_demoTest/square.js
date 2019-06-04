function solution(v) {
    var answer = [], v1 = [], v2 = [], vLength = v.length, x, y, i;
    for(i=0; i<vLength; i++){
        x = v[i][0], y = v[i][1];
        if (v1.indexOf(x) < 0) {
            v1.push(x);
        } else {
            v1.splice(v1.indexOf(x),1);
        }
        if (v2.indexOf(y) < 0) {
            v2.push(y);
        } else {
            v2.splice(v2.indexOf(y))
        }
    }
    answer = v1.concat(v2)


    return answer;
}
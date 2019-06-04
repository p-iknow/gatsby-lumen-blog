// 시작 숫자 부터 끝 숫자까지를 포함하는 배열을 만드는 함수
function makeArray(start = 1, end = 9) {
    var array = []
    for (start; start < end + 1; start++) {
        array.push(start)
    }
    return array
}

var arr = makeArray(1,11);

function count(arr) {
   return (arr.length < 1) ? 0 :  1 + count(arr.slice(1));
}

count(arr);



var mergeSort = function(array) {
    if (array.length < 2) return array; // 원소가 하나일 때는 그대로 내보냅니다.
    var pivot = Math.floor(array.length / 2); // 대략 반으로 쪼개는 코드
    var left = array.slice(0, pivot); // 쪼갠 왼쪽
    var right = array.slice(pivot, array.length); // 쪼갠 오른쪽
    return merge(mergeSort(left), mergeSort(right)); // 재귀적으로 쪼개고 합칩니다.
  }
  function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
      if (left[0] <= right[0]) { // 두 배열의 첫 원소를 비교하여
        result.push(left.shift()); // 더 작은 수를 결과에 넣어줍니다.
      } else {
        result.push(right.shift()); // 오른쪽도 마찬가지
      }
    }
    while (left.length) result.push(left.shift()); // 어느 한 배열이 더 많이 남았다면 나머지를 다 넣어줍니다.
    while (right.length) result.push(right.shift()); // 오른쪽도 마찬가지
    return result;
  };
  
  mergeSort([5,2,4,7,6,1,3,8]); // [1, 2, 3, 4, 5, 6, 7, 8]


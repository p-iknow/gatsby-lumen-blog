function getPair(arr) {
    var init = [];
    var result = arr.reduce(function (init, v, i, arr) {
            if (!(init.includes(arr[i]))) {init[arr[i]] = [];}
            init[arr[i]].push(arr[i]);
            return init;
    }, init);
    return result;
}

getPair([1,2,2,3,3,4,4]);
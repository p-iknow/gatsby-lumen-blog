// https://app.codesignal.com/arcade/intro/level-2/yuGuHvcCaFCKk56rJ/solutions?solutionId=TDdp2J8jgPZgoRJHx

// my solution
function shapeArea(n) {
    let acc = 1;
    if ( n === 1 ) {
        return 1;    
    }
    for (let i=2; i< n+1; i++) {
        acc = acc + ((i-1) * 4)
    }
    return acc

}

// Best 
function shapeArea(n) {
    return Math.pow(n, 2) + Math.pow(n-1, 2);
}

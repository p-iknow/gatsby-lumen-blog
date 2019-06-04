// line
//  https://www.hackerrank.com/challenges/plus-minus/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign

function plusMinus(arr) {
    const sizeOfLength = arr.length;
    let zero=0, positive=0, negative=0;
    const res = arr.forEach(v => {
        if (Math.sign(v === (0 | -0))) zero++;
        else { Math.sign(v) === 1 ? positive++ : negative++ }  
    })
    return [positive, negative, zero].map(v => v/sizeOfLength).map(v => v.toFixed(6)).forEach(v => console.log(v));

}

plusMinus([-4, 3, -9, 0, 4, 1])

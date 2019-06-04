//basic Recursion structure

function countDown() {
    console.log(i);
    if (i <= 1 ) return;  // -> basic step
    else countDown(i-1);  // -> recursion step
}
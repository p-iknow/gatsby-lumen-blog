
// 시작 숫자 부터 끝 숫자까지를 포함하는 배열을 만드는 함수
function makeArray(start = 1, end = 9) {
    var array = []
    for (start; start < end + 1; start++) {
        array.push(start)
    }
    return array
}


// 특정 배열로부터 3가지 랜덤한 숫자를 뽑아 배열로 만드는 함수
function makeRanNum() {
    var numList = makeArray(), select, number = [];
    for (var i = 0; i < 3; i++) {
        select = Math.floor(Math.random() * numList.length);
        //console.log(`numList: ${numList}, \n number: ${number} \n length: ${numList.length}`)
        number[i] = numList.splice(select, 1)[0];
    }
    return number;
}

// 예측값을 받아 3가
function makeGuess(){
    var guess = prompt("Insert Your Guess 3number").split("").map((x) => Number(x));
    return guess;
}

function compare2(i, result) {
    for(var j=0; j<=2; j++) {
        if (result.answer[i] === result.guess[j]) {
            if (i === j) {
                result.strike++
            } else {
                result.ball++
            }
            break;
        }
    }
}

function compare(answer, guess) {
    
    var i, result = {strike : 0, ball : 0, guess:guess, answer:answer};
    for (i = 0; i <=2; i++) {
            compare2(i, result);
        }
    return result;
}   





function printResult(n, result) {
    console.info(`${n}회차, 입력값 : ${result.guess}, strike: ${result.strike}, ball:${result.ball} `);
}


function main() {
    var strike, n=1, answer = makeRanNum();
    //반목문 시작 
    while(!(strike===3)) {
        //strike 초기화
        strike = 0;

        //입력값과 비교 
        var result = compare(answer, makeGuess()); 
        printResult(n, result)
        strike = result.strike

        if (strike === 3) {
            console.log("정답!! 게임 종료");
            break;
        } 
        n++
    }
}

main();

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



function compare(answer, guess) {
    var strike = 0, ball = 0
    if(answer[0] === guess[0]){strike++;}
    else if(answer[0] === guess[1] || answer[0] === guess[2]){ball++;}
    
    if(answer[1] === guess[1]){strike++;}
    else if(answer[1] === guess[0] || answer[1] === guess[2]){ball++;}

    if(answer[2] === guess[2]){strike++;}
    else if(answer[2] === guess[0] || answer[2] === guess[1]){ball++;}
    
    // for (i = 0; i < 3; i++) {
    //     compare2(i)
    //     for (j = 0; j < 3; j++) {
    //         if (answer[i] === guess[j]) {
    //             if (i === j) {
    //                 strike++
    //             } else {
    //                 ball++
    //             }
    //             break;
    //         }
    //     }
    // }
    console.info(`입력값 : ${guess}, strike: ${strike}, ball:${ball} `);
    return strike

}   



var strike, answer = makeRanNum();
//반목문 시작 
while(!(strike===3)) {
    //strike 초기화
    strike = 0;

    //입력값과 비교 
    strike = compare(answer, makeGuess()); 

    if (strike === 3) {
        console.log("정답!! 게임 종료");
        break;

    } 
}

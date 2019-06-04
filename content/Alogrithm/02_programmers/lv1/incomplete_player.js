// First idea

var participant =  ["marina", "josipa", "nikola", "vinko", "filipa"] 
var completion = ["josipa", "filipa", "marina", "nikola"]

function solution(participant, completion) {
    for (var i = 0; i < completion.length - 1; i++) {
        console.log(i)
        for (var j = participant.length - 1; participant.length === 1; j--) {
            
            if (completion[i] === participant[j]) {
                
                
            }
        }


    }
    console.log(participant)
    var answer = participant[0];
    return answer;
}

// Second Idea

function solution(participant, completion) {
    for (let i = 0; i < completion.length; i++) {
        participant.splice(participant.indexOf(completion[i]),1);
    }
    return participant[0]
}




// 자바스크립트 배열 삭제 법 
let a = [1, 2, 3, 4]
const idx = a.indexOf(3)
if (idx > -1) a.splice(idx, 1)


// reduce 활용
var dic = completion.reduce((obj, t)=> (
    obj[t]= obj[t] ? obj[t]+1 : 1 , obj) ,{});

function solution(participant, completion) {
    var dic = completion.reduce((obj, t)=> (obj[t]= obj[t] ? obj[t]+1 : 1 , obj) ,{});
    //dic {josipa: 1, filipa: 1, marina: 1, nikola: 1}
    return participant.find(t=> {
        if(dic[t])
            dic[t] = dic[t]-1;
        else 
            return true;
    });
}

// map 활용
function solution(participant, completion) {
    let key = new Map()

    for(let i = 0 ; i < completion.length ; i ++){
        if(!key.has(completion[i])){
            key.set(completion[i],1)
        }else{
            key.set(completion[i], key.get(completion[i])+1)
        }        
    }

    for(let i = 0 ; i < participant.length ; i ++){


        if(!key.has(participant[i])){
            return participant[i]
        }else{
            let count = key.get(participant[i])
            if(count ===0){
                return participant[i]
            }else(
                key.set(participant[i], count-1)
            )
        }
    }
}
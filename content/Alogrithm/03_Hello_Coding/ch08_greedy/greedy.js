let statesNeeded = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]),
    stations = {};

// 방송국 목록
stations.kone = new Set(["id", "nv", "ut"]);
stations.ktwo = new Set(["wa", "id", "mt"]);
stations.kthree = new Set(["or", "nv", "ca"]);
stations.kfour = new Set(["nv", "ut"]);
stations.kfive = new Set(["ca", "az"]);

// 방문할 방송국을 저장할 집합
let finalStation = new Set();

while(statesNeeded.size){
        // 현재 선택할 수 있는 가장 바람직한 방속국
        let bestStation = null;

        // 아직 방속되지 않은 주 중에서 해당 방속국이 커버하는 주의 집합 
        let statesCovered = new Set(); 
    
        //반복문을 써서 어떤 방송국이 최선의 선택인지 판단한다.
        for (let key in stations) {
            let covered = new Set([...statesNeeded].filter(v => stations[key].has(v)))
            if (covered.size > statesCovered.size) {
                bestStation = key;
                statesCovered = covered;
            }
        }
        statesNeeded = new Set([...statesNeeded].filter(v => !statesCovered.has(v)));
        finalStation.add(bestStation);
    
}

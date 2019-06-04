// make new graph 
const graph = {};
graph.you = ["alice", "bob", "claire"];
graph.bob = ["anuj", "peggy"];
graph.alice = ["peggy"];
graph.claire = ["thom", "jonny"];
graph.anuj = [];
graph.peggy = [];
graph.thom = [];
graph.jonny = [];

// make new que;
const searchQue = [].push(...graph.you);

// Array to record prcessd item 
const searched = []

function personIsSeller(name) {
   return name.slice(-1) === "m";
}

//
while(searchQue) {
   let person = searchQue;
   if (personIsSeller(person)) {
      console.log(`${person} is a mango seller `);
      return true
   } else{
      searchQue.push(...graph[person])
      searched.push(person);
   }
}
return false;
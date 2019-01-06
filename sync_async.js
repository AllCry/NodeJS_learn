//Nodo의 기본 방식으로 비동기식이 활용되기 때문에 함수를 던져주고 다른 일을 한다.

var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
    console.log(3);
    console.log(data);
})
console.log(4);
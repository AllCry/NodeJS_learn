//기본적으로 node js에서 제공하는 가이드코드
//호스트네임과 포트를 적어서 서버에서 포트를 '리슨'하게 한다.

const http = require('http');
 
const hostname = '127.0.0.1';
const port = 1337;
 
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
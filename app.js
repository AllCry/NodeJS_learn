var express = require('express');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var app = express();

app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req,res){
    res.send('getting get')
    // var title = req.query.title;
    // var description = req.query.description;
    // res.send(title+','+description);
});
app.post('/form_receiver', function(req,res){
    // res.send('getchat')
    var title = req.body.title;
    var description = req.body.description;
    // res.send(title+','+description);
    res.send(req.body);
});
app.get('/topic/:id', function(req, res){
    var topics = [
        'javascript is ...',
        'nodejs is ...',
        'express is ...'
    ];
    var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">nodejs</a><br>
    <a href="/topic/2">express</a><br><br>
    ${topics[req.params.id]}
    `
    
    res.send(output);
})
app.get('/topic/:mode', function(req, res){
    res.send(res.params.id+','+res.params.mode);
})

app.get('/', function (req, res) {
    res.send("hello home page");
});
app.get('/template', function(req, res){
    res.render('temp', {time:Date()});
});
app.get('/dynamic', function(req, res){
    var lis = '';
    for (i=0;i<5;i++){
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        hello, Dynamic
        ${time}
        <ul>
        ${lis}
        </ul>
    </body>
    </html>`;
    res.send(output);
});
app.get('/pandas',function(req, res){
    res.send('hello panda, <img src = "/pandas.jpg">');
});
app.get('/login', function (req, res) {
    res.send('<h1>login please<h1>');
});

/*app.use((req, res)=>{
res.send(404, '그런 경로는 없습니다.');
});*/ 
/*각 app.get 속의 res.send를 만나면 즉시 send를 하고 종료되지만,
그러한 경로를 만나지 못하면 죽 건너뛰고 미들웨어인 app.use를 만나게 되고,
app.use 속의 res.send의 첫번째 매개변수에는 200, 404, 500 등의 응답코드를 넣을 수 있고,
두번째 매개변수에는 응답하고 싶은 내용을 적을 수 있습니다.*/
//즉 어떠한 경로로 들어와도 내가 정한 params를 제외하고 모두 app.use로 응답할 수 있다.

app.listen(3000, function () {
    console.log('Connected 3000 port!');
});


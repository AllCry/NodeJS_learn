var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: _storage });

var app = express();

app.use('/user', express.static('uploads'));

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/upload', function (req, res) {
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), function (req, res) {
    console.log(req.file);
    res.send('Uploading : ' + req.file.filename);
});

app.get('/topic/new', function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics: files });
    });
})

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('data', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if (id) {
            // id값이 있을때
            fs.readFile('data/' + id, 'utf8', function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, description: data });
            });

        } else {
            // id값이 없을 때
            res.render('view', { topics: files, title: 'Welcome', description: 'Hello, JavaScript for Server.' });
        }

    })
});

// app.get('/topic/:id', function(req, res){
//     var id = req.params.id;
//     fs.readdir('data', function(err, files){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', function(err, data){
//             if(err){
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view',{topics:files, title:id, description:data});
//         });
//     });
// });
app.post('/topic', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/' + title);
    });

});


app.listen(3000, function () {
    console.log("3000port run!")
});


// 파일 형식에 따른 저장 경로 변환, 파일 존재 여부에 따른 저장시 파일 이름 counting 구현 해봤습니다.
// var _storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // 파일 타입에 따른 경로 지정 ex) .jpg - uploads/image, .txt - uploads/text
//         var path = 'uploads/' + file.mimetype.split('/')[0] + '/';
//         // 파일 경로 존재 확인
//         if (!fs.existsSync(path)) {
//             // 없으면 폴더 생성
//             fs.mkdir(path, function (err) {
//                 if (err) {
//                     console.log('failed to create directory', err);
//                 }
//             });
//         }
//         cb(null, path);
//     },
//     filename: function (req, file, cb) {
//         var path = 'uploads/' + file.mimetype.split('/')[0] + '/';
//         // 파일이 저장경로 있는지 확인
//         fs.readdir(path, function (err, files) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             var cnt = 0;
//             for (var i = 0; i < files.length; i++) {
//                 // 저장 경로의 파일 탐색 후 있으면 같은 이름의 파일이 몇개인지 cnt
//                 if (files[i].indexOf(file.originalname) == 0) {
//                     cnt++;
//                 }
//             }
//             // 여러 개의 파일이 존재 시 마지막 파일의 카운트 보다 큰 넘버를 추가하고 파일 이름 저장
//             if (cnt > 0) {
//                 cb(null, file.originalname + " - " + cnt);
//                 // 아니면 그냥 저장
//             } else {
//                 cb(null, file.originalname);
//             }
//         });
//     }
// });

// gulify-js 설치
// npm install uglify-js -g -> -g는 글로벌하게 설치해서 프로젝트가 아닌 전체에서 쓸 수 있게 함
// 사용법 : 
//         uglifyjs 입력파일명.js <-o 출력파일명.js> -m(맹글)
//         1. 입력파일을 입력하면 빈칸, 띄어쓰기, 줄바꿈을 없애서 데이터를 줄여준다.
//         2. -m옵션은 변수같은 바꿔도 상관없는 이름들을 줄여준다.
//         3. -o옵션은 바꿔준 코드들을 파일로 출력해준다(보통 파일명.min을 붙여서 그 파일의 줄여준 출력이라고 표현)

function hello(name){
    console.log('Hi,'+name);
}
hello('jenill');
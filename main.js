import dotenv from "dotenv";
dotenv.config;
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import diaryRouter from "./routes/diary.js";
import cors from "cors";

const saltRounds = 10;

const app = express();

// MySQL 연결을 위한 설정
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(cors());
// app.use(express.json());
app.use("/diary", diaryRouter);

app.post('/login', (request, response) => {
  console.log(request.body);
  const uid = request.body.uid;
  const password = request.body.password;

  if (uid && password) {
      connection.query('SELECT * FROM accounts WHERE uid = ?', [uid], function(error, results, fields) {
          if (results.length > 0) {
              bcrypt.compare(password, results[0].password, function(err, res) {
                  if(res) {
                      request.session.loggedin = true;
                      request.session.uid = uid;
                      response.redirect('/');
                  } else {
                      response.send('잘못된 비밀번호입니다!');
                  }            
                  response.end();
              });
          } else {
              response.send('해당 사용자는 존재하지 않습니다!');
              response.end();
          }
      });
  } else {
      response.send('아이디와 비밀번호를 입력해주세요!');
      response.end();
  }
});


app.get('/', function(request, response) {
  if (request.session.loggedin) {
      response.send('환영합니다, ' + request.session.username + '님!');
  } else {
      response.send('로그인이 필요합니다!');
  }
  response.end();
});


app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

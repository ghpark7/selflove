import dotenv from "dotenv";
dotenv.config;
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import mysql2 from "mysql2";
import diaryRouter from "./routes/diary.js";
import cors from "cors";
import checklistRouter from "./routes/checklist.js";
import { mysqlConnection } from "./mysql.conn.js";

const app = express();

// MySQL 연결을 위한 설정
const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
app.use(cors());
app.use("/diary", diaryRouter);
app.use("/checklist", checklistRouter);

app.post("/register", async function (req, res) {
  try {
    console.log(req.body);
    console.log(1);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(2);
    const user = {
      uid: req.body.uid,
      password: hashedPassword,
      nickname: req.body.nickname,
      email: req.body.email,
    };
    console.log(3);
    await mysqlConnection.connection.execute(
      "INSERT INTO User (nickname, email, password) VALUES (?, ?, ?)",
      [user.nickname, user.email, user.password]
    );
    console.log(5);
    res.send("성공했습니다!");
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  if (email && password) {
    connection.query(
      "SELECT * FROM User WHERE email = ?",
      [email],
      function (error, results, fields) {
        if (results.length > 0) {
          bcrypt.compare(password, results[0].password, function (err, res) {
            if (res) {
              response.send({ uid: results[0].uid, email });
            } else {
              response.send("잘못된 비밀번호입니다!");
            }
            response.end();
          });
        } else {
          response.send("해당 사용자는 존재하지 않습니다!");
          response.end();
        }
      }
    );
  } else {
    response.send("아이디와 비밀번호를 입력해주세요!");
    response.end();
  }
});

app.get("/", function (request, response) {
  if (request.session.loggedin) {
    response.send("환영합니다, " + request.session.email + "님!");
  } else {
    response.send("로그인이 필요합니다!");
  }
  response.end();
});

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

import express from "express";
import { mysqlConnection } from "../mysql.conn.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { content } = req.body;

  const uid = 1;
  const insertChecklistQuery =
    "INSERT INTO Checklist (isCompl, month, year, content, uid) VALUES (?, ?, ?, ?, ?)";
  const values = [
    false,
    new Date().getMonth() + 1,
    new Date().getFullYear(),
    content,
    uid,
  ];

  try {
    await mysqlConnection.connection.execute(insertChecklistQuery, values);
    res.status(201).json({ message: "체크리스트 저장 성공" });
  } catch (error) {
    res.send(error);
  }
});

router.get("/score", async (req, res) => {
  const uid = 1;
  const selectChecklistQuery =
    "SELECT * FROM Checklist WHERE uid = ? AND month = ? AND year = ?";
  const values = [uid, new Date().getMonth() + 1, new Date().getFullYear()];

  try {
    const [result] = await mysqlConnection.connection.execute(
      selectChecklistQuery,
      values
    );
    const perOfCompl = Math.round(
      (result.filter((item) => item.isCompl === 1).length / result.length) * 100
    );
    res.json({ score: perOfCompl });
  } catch (error) {
    res.send(error);
  }
});

router.get("/", async (req, res) => {
  const uid = 1;
  const selectChecklistQuery =
    "SELECT * FROM Checklist WHERE uid = ? AND month = ? AND year = ?";
  const values = [uid, new Date().getMonth() + 1, new Date().getFullYear()];

  try {
    const [result] = await mysqlConnection.connection.execute(
      selectChecklistQuery,
      values
    );
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/achieve/:cid", async (req, res) => {
  const { cid } = req.params;

  const updateChecklistQuery =
    "UPDATE Checklist SET isCompl = NOT isCompl WHERE cid = ?";
  const values = [cid];

  try {
    await mysqlConnection.connection.query(updateChecklistQuery, values);
    res.send({ message: "체크리스트 상태 토글 성공" });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { content } = req.body;

  const updateChecklistQuery = "UPDATE Checklist SET content = ? WHERE cid = ?";
  const values = [content, cid];

  try {
    await mysqlConnection.connection.query(updateChecklistQuery, values);
    res.send({ message: "체크리스트 수정 성공" });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:did", async (req, res) => {
  const { did } = req.params;

  const deleteDiaryQuery = "DELETE FROM Diary WHERE did = ?";
  const values = [did];

  try {
    await mysqlConnection.connection.query(deleteDiaryQuery, values);
    res.send({ message: "일기 삭제 성공" });
  } catch (error) {
    res.send(error);
  }
});

const checklistRouter = router;
export default checklistRouter;

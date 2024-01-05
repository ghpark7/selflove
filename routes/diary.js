import express from "express";
import { mysqlConnection } from "../mysql.conn.js";

const router = express.Router();

// 일기 조회
router.get("/my", async (req, res) => {
  const uid = 1; // TODO: 세션 정보를 바탕으로 얻어내도록 변경 필요

  const selectDiariesQuery =
    "SELECT * FROM Diary WHERE uid = ? ORDER BY createdAt DESC";
  const values = [uid];

  try {
    const [result] = await mysqlConnection.connection.execute(
      selectDiariesQuery,
      values
    );
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:did", async (req, res) => {
  const { did } = req.params;

  const selectDiariesQuery = "SELECT * FROM Diary WHERE did = ?";
  const values = [did];

  try {
    const [result] = await mysqlConnection.connection.execute(
      selectDiariesQuery,
      values
    );
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

// 일기 추가
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  const userId = 1;
  const insertDiaryQuery =
    "INSERT INTO Diary (title, content, uid, createdAt) VALUES (?, ?, ?, NOW())";
  const values = [title, content, userId];

  try {
    await mysqlConnection.connection.execute(insertDiaryQuery, values);
    res.status(201).json({ message: "일기 저장 성공" });
  } catch (error) {
    res.send(error);
  }
});

// 일기 수정
router.patch("/:did", async (req, res) => {
  const { did } = req.params;
  const { title, content } = req.body;

  const updateDiaryQuery =
    "UPDATE Diary SET title = ?, content = ? WHERE did = ?";
  const values = [title, content, did];

  try {
    await mysqlConnection.connection.query(updateDiaryQuery, values);
    res.send({ message: "일기 수정 성공" });
  } catch (error) {
    res.send(error);
  }
});

// 일기 삭제
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

const diaryRouter = router;
export default diaryRouter;

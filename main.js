import express from "express";
import diaryRouter from "./routes/diary.js";
import cors from "cors";
import checklistRouter from "./routes/checklist.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/diary", diaryRouter);
app.use("/checklist", checklistRouter);

app.listen(8000, function () {
  console.log("Example app listening on port 8000!");
});

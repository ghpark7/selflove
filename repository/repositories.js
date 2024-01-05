import Diary from "../entity/Diary";
import User from "../entity/User";
import Checklist from "../entity/checklist";

const { DataSource } = require("typeorm");
const { MYSQL_CONFIG } = require("../config/mysql.config");

const mysqlConn = new DataSource(MYSQL_CONFIG);

export const userRepository = mysqlConn.getRepository(User);
export const diaryRepository = mysqlConn.getRepository(Diary);
export const checklistRepository = mysqlConn.getRepository(Checklist);

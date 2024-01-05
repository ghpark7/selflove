const {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} = require("typeorm");
const Diary = require("./Diary.entity");
const Checklist = require("./Checklist.entity");

@Entity()
class User {
  @PrimaryGeneratedColumn()
  uid;

  @Column()
  nickname;

  @Column()
  email;

  @Column()
  password;

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries;

  @OneToMany(() => Checklist, (checklist) => checklist.user)
  checklists;
}

module.exports = User;

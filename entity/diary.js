const {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} = require("typeorm");
const User = require("./User.entity");

@Entity()
class Diary {
  @PrimaryGeneratedColumn()
  did;

  @Column()
  createdAt;

  @Column()
  title;

  @Column()
  content;

  @ManyToOne(() => User, (user) => user.diaries)
  @JoinColumn({ name: "uid" })
  user;
}

module.exports = Diary;

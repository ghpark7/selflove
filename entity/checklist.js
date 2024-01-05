const {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} = require("typeorm");
const User = require("./User.entity");

@Entity()
class Checklist {
  @PrimaryGeneratedColumn()
  cid;

  @Column()
  isCompl;

  @Column()
  month;

  @Column()
  year;

  @ManyToOne(() => User, (user) => user.checklists)
  @JoinColumn({ name: "uid" })
  user;
}

module.exports = Checklist;

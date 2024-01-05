import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./User.entity";

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

export default Checklist;

@Entity()
class User {
  @PrimaryGeneratedColumn()
  uid: int;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Diary, (diary) => diary.user)
  diaries;

  @OneToMany(() => Checklist, (checklist) => checklist.user)
  checklists;
}

export default User;

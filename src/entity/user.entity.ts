import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { ProfileModel } from "./profile.entity";
import { PostModel } from "./post.entity";

export enum Role {
     USER = 'user',
     ADMIN = 'admin'
}

@Entity()
export class UserModel {
     /**
      * @PrimaryGeneratedColumn() -> 'uuid'
      * @PrimaryColumn()
      */

     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     email: string;
     
     // @Column({
     //      // 데이터베이스에 인지하는 칼럼 타입
     //      // 자동으로 유추됨
     //      type: 'varchar',
     //      name: 'title',
     //      length: 300, // varchar일때만 지정
     //      nullable: true,
     //      update: true, // 처음에만 값 지정 가능, 이후 값 변경 불가능
     //      select: true, // find()를 실행할 때 기본으로 값을 불러올지(기본 값이 true)
     //      default: 'default value', // 기본 값, 아무것도 입력 안했을때 기본으로 입력되게 되는 값
     //      unique: false,
     // })
     // title: string;

     @Column({
          type: 'enum',
          enum: Role,
          default: Role.USER
     })
     role: Role; 

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;

     // 데이터가 업데이트 될때마다 1씩 증가 (처음 생성 1)
     // save() 함수가 몇번 불렸는지 기억
     @VersionColumn() 
     version: number;

     @Column()
     @Generated('uuid') // increment, uuid(string)
     additionalId: string;

     @OneToOne(() => ProfileModel, (profile) => profile.user, {
          // find() 실행 할때마다 항상 같이 가져올 relation
          eager: false,
          // 저장할 때 relation을 한번에 같이 저장 가능
          cascade: true,
          // null이 가능한지
          nullable: true,
          // 관계가 삭제했을 때
          // no-action -> 아무것도 안함
          // cascade -> 참조하는 Row도 같이 삭제
          // set null -> 참조하는 Row에서 참조 id를 null로 변경
          // set default -> 기본 세팅으로 설정(테이블의 기본 세팅)
          // restrict -> 참조하고 있는 row가 있는 경우 참조당하는 Row 삭제 불가
          onDelete: 'SET NULL',
     })
     @JoinColumn()
     profile: ProfileModel;

     @OneToMany(() => PostModel, (post) => post.author)
     posts: PostModel[];

     @Column({
          default: 0
     })
     count: number;
}
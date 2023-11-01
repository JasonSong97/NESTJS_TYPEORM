import { ChildEntity, Column, CreateDateColumn, Entity, TableInheritance, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseModel {

     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {
     
     @Column()
     name: string;
}

@Entity()
export class CarModel extends BaseModel {
     
     @Column()
     name: string;
}

// 싱글 테이블 전략

@Entity()
@TableInheritance({
     column: {
          name: 'type',
          type: 'varchar'
     }
})
export class SingleBaseModel {

     @PrimaryGeneratedColumn()
     id: number;

     @CreateDateColumn()
     createdAt: Date;

     @UpdateDateColumn()
     updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {

     @Column()
     brand: string;
}

@ChildEntity()
export class AirplaneModel extends SingleBaseModel {

     @Column()
     country: string;
}
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', {comment: '主键'})
    id: string;


    @Column("text", {nullable: true})
    nickName: string;

    @Column("text", {nullable: true})
    password: string;
}


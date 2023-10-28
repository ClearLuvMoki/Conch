import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', {comment: '主键'})
    id: string;


    @Column("text", {nullable: true})
    @IsNotEmpty({message: "昵称不能为空!"})
    nickName: string;

    @Column("text", {nullable: true})
    @IsNotEmpty({message: "密码不能为空!"})
    password: string;
}


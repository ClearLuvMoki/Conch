import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
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

    @CreateDateColumn({comment: '创建时间'})
    createTime: Date;

}


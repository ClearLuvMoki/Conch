import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("users")
export class UserModel {
    @PrimaryGeneratedColumn('uuid', {comment: '主键'})
    id: string;

    @Column("text", {nullable: true})
    name: string;
}


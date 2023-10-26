import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity("user-info")
export class UserModel {
    @PrimaryColumn('uuid', { comment: '主键' })
    id: string;

    @Column({type: "varchar"})
    name: string
}


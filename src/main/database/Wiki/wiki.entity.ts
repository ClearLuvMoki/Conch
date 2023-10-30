import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity("wiki")
export class WikiEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text", {nullable: true})
    @IsNotEmpty({message: "WikiId不能为空!"})
    wikiId: string;

    @Column("text", {nullable: true})
    @IsNotEmpty({message: "知识库名称不能为空!"})
    title: string;

    @Column("text", {nullable: true})
    avatar: string;

    @Column("longtext", {nullable: true})
    description: string;

    @CreateDateColumn({comment: '创建时间'})
    createTime: Date;

}


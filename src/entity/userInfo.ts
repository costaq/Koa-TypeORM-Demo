import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { Base } from "./base";
import { User } from "./user";

@Entity()
export class UserInfo extends Base {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    birthDate: Date;

    constructor(name: string, birthDate: Date) {
        super();
        this.name = name;
        this.birthDate = birthDate;
    }

    edit(name: string, birthDate: Date) {
        this.name = name;
        this.birthDate = birthDate;
    }
}

export const editUserInfoSchema = {
    name: { type: "string", required: true, example: "张女士" },
    birthDate: { type: "Date", required: true, example: "1992-01-06" }
};
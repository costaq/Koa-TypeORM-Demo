import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { Address } from "./userAddress";
import { Base } from "./base";
import { UserInfo } from "./userInfo";

@Entity()
export class User extends Base {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userName: string;

    @Column()
    displayName: string;

    @Column()
    password: string;

    /**
     * @todo OneToOne 级联删除失效
     */
    @OneToOne(() => UserInfo, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    info: UserInfo;

    @OneToMany(() => Address, address => address.user)
    addresses: Address[];

    constructor(userName: string, displayName: string, password: string, name: string, birthDate: Date) {
        super();
        this.userName = userName;
        this.displayName = displayName;
        this.password = password;
        this.info = new UserInfo(name, birthDate);
    }

    edit(displayName: string, password: string) {
        this.displayName = displayName;
        this.password = password;
    }

    editUserInfo(name: string, birthDate: Date) {
        this.info.edit(name, birthDate);
    }
}

export const createUserSchema = {
    userName: { type: "string", required: true, example: "test" },
    displayName: { type: "string", required: true, example: "测试" },
    password: { type: "string", required: true, example: "123456" },
    name: { type: "string", required: true, example: "张女士" },
    birthDate: { type: "Date", required: true, example: "1992-01-06" }
};

export const editUserSchema = {
    displayName: { type: "string", required: true, example: "测试" },
    password: { type: "string", required: true, example: "123456" }
};
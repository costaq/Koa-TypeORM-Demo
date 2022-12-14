import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { Base } from "./base";
import { User } from "./user";

@Entity({ name: 'user_address' })
export class Address extends Base {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: true })
    province: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    district: string;

    @Column({ nullable: true })
    street: string;

    @Column({ nullable: true })
    address: string;

    @ManyToOne(() => User, user => user.addresses, { onDelete: 'CASCADE' })
    user: User;

    constructor(user: User, province: string, city: string, district: string, street: string, address: string) {
        super();
        this.user = user;
        this.province = province;
        this.city = city;
        this.district = district;
        this.street = street;
        this.address = address;
    }
}

export const editUserAddressSchema = {
    province: { type: "string", required: true, example: "上海" },
    city: { type: "string", required: true, example: "上海" },
    district: { type: "string", required: true, example: "黄浦区" },
    street: { type: "string", required: true, example: "南京东路街道" },
    address: { type: "string", required: true, example: "XXXX大楼" },
    userId: { type: "string", required: true, example: "" }
};
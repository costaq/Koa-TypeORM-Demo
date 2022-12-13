import { Entity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export abstract class Base {

    @CreateDateColumn()
    createdTime: Date;

    @UpdateDateColumn()
    updatedTime: Date;
}
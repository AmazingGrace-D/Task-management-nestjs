import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task.model";

class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
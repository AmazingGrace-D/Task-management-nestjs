import { Repository, EntityRepository } from "typeorm";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createtaskdto: CreateTaskDto): Promise<Task> {
        const {title, description} = createtaskdto;

        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }


}
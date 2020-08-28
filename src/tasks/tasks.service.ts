import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createtaskdto: CreateTaskDto) {
        const {title, description} = createtaskdto;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string) {
        let t = this.tasks.find(task => task.id === id); //find the task
        return this.tasks.splice(this.tasks.indexOf(t), 1); //delete the task
    }
}

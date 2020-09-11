/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTask(filterDto: GetTaskFilterDto): Task[] {
    //     const {status, search} = filterDto

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
    //     }

    //     return tasks

    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createTask(createtaskdto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createtaskdto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);  
        }
        
    }
    // deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id); // filters out ids that returns false 
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTask(
        filterDto: GetTaskFilterDto,
        user: User
        ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user)
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createTask(createtaskdto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createtaskdto, user);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);  
        }
        
    }

    // async updateTask(id: number, status: TaskStatus): Promise<Task> {
    //     const task = await this.getTaskById(id);
    //     task.status = status;
    //     await task.save();
    //     return task;        
    // }

}

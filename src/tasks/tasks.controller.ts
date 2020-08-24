import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {};

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post() 
    createTask(@Body() createtaskdto: CreateTaskDto): Task {
        return this.tasksService.createTask(createtaskdto)
    }

}

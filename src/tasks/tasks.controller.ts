import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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

    @Get('/:id')
    getTaskById(@Param('id') id:string) {
        return this.tasksService.getTaskById(id)
    }

    @Post() 
    createTask(@Body() createtaskdto: CreateTaskDto): Task {
        return this.tasksService.createTask(createtaskdto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) {
        return this.tasksService.deleteTaskById(id)
    }

}

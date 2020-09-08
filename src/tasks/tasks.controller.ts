import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {};

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            console.log(filterDto);
            
            return this.tasksService.getTask(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }


    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe) 
    createTask(@Body() createtaskdto: CreateTaskDto): Task {
        return this.tasksService.createTask(createtaskdto)
    }

    @Patch('/:id/status')
    updateTask (
        @Param('id') id: string, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTask(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        return this.tasksService.deleteTask(id)
    }

}

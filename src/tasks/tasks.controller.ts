import { Controller, Get, Post, Body, Param, Delete, Patch, Query, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {};

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         console.log(filterDto);
            
    //         return this.tasksService.getTask(filterDto);
    //     } else {
    //         return this.tasksService.getAllTasks();
    //     }
    // }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe) 
    createTask(@Body() createtaskdto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createtaskdto)
    }

    // @Patch('/:id/status')
    // updateTask (
    //     @Param('id') id: string, 
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.tasksService.updateTask(id, status);
    // }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

}

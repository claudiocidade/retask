import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Put, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './dto/create-task.dto';
import { ChangeTaskStatusRequest } from './dto/change-task-status.dto';
import { FilterTasksRequest } from './dto/filter-tasks.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  public async list(@Query(ValidationPipe) request: FilterTasksRequest): Promise<Task[]> { 
    if (Object.keys(request))
    return await this.service.list(request); 
  };

  @Get('/:id')
  public async get(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.service.get(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async create(@Body() request: CreateTaskRequest): Promise<Task> { 
    return await this.service.create(request);
  }

  @Put('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() request: UpdateTaskRequest
  ): Promise<Task> {
    return await this.service.update(id, request);
  }

  @Patch('/:id/status')
  public async changeStatus(
    @Param('id', ParseIntPipe) id: number, 
    @Body(TaskStatusValidationPipe) request: ChangeTaskStatusRequest,
  ): Promise<Task> {
    return await this.service.changeStatus(id, request);
  }

  @Delete('/:id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.delete(id);
  }
}

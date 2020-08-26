import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './dto/create-task.dto';
import { ChangeTaskStatusRequest } from './dto/change-task-status.dto';
import { FilterTasksRequest } from './dto/filter-tasks.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { ITask } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  public list(@Query(ValidationPipe) request: FilterTasksRequest):ITask[] { 
    if (Object.keys(request))
    return this.service.list(request); 
  };

  @Get('/:id')
  public get(@Param('id') id: string): ITask {
    return this.service.get(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public create(@Body() request: CreateTaskRequest): ITask { 
    return this.service.create(request);
  }

  @Put('/:id')
  public update(
    @Param('id') id: string, 
    @Body() request: UpdateTaskRequest
  ): ITask {
    return this.service.update(id, request);
  }

  @Patch('/:id/status')
  public changeStatus(
    @Param('id') id: string, 
    @Body(TaskStatusValidationPipe) request: ChangeTaskStatusRequest,
  ): ITask {
    return this.service.changeStatus(id, request);
  }

  @Delete('/:id')
  public delete(@Param('id') id: string): void {
    this.service.delete(id);
  }
}

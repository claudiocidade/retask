import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskRequest } from './dto/create-task.dto';
import { ChangeTaskStatusRequest } from './dto/change-task-status.dto';
import { FilterTasksRequest } from './dto/filter-tasks.dto';
import { ITask } from './task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  public list(@Query() request: FilterTasksRequest):ITask[] { 
    if (Object.keys(request))
    return this.service.list(request); 
  };

  @Get('/:id')
  public get(@Param('id') id: string): ITask {
    return this.service.get(id);
  }

  @Post()
  public create(@Body() request: CreateTaskRequest): ITask { 
    return this.service.create(request);
  }

  @Patch('/:id')
  public changeStatus(
    @Param('id') id: string, 
    @Body() request: ChangeTaskStatusRequest
  ): ITask {
    return this.service.changeStatus(id, request);
  }

  @Delete('/:id/status')
  public delete(@Param('id') id: string): void {
    this.service.delete(id);
  }
}

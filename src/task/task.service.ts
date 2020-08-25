import { Injectable } from '@nestjs/common';
import { ITask, TaskStatus } from './task.model';
import { CreateTaskRequest } from './dto/create-task.dto';
import { ChangeTaskStatusRequest } from './dto/change-task-status.dto';
import { FilterTasksRequest } from './dto/filter-tasks.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: ITask[]

  constructor() {
    this.tasks = [];
  }

  public list(request?: FilterTasksRequest): ITask[] {
    if (!request) return this.tasks;
    const { status, search } = request;
    let tasks = this.tasks;
    if (status) tasks = tasks.filter(item => item.status === status);
    return tasks;
  }

  public get(id: string): ITask {
    return this.tasks.find(item => item.id === id);
  }

  public create(request: CreateTaskRequest): ITask {
    const { title, description } = request;
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  public changeStatus(id: string, request: ChangeTaskStatusRequest): ITask {
    const task: ITask = this.get(id);
    task.status = request.status;
    return task;
  }

  public delete(id: string): void {
    this.tasks = this.tasks.filter(item => item.id !== id);
  }
}

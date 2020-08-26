import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskRequest } from './dto/create-task.dto';
import { ChangeTaskStatusRequest } from './dto/change-task-status.dto';
import { FilterTasksRequest } from './dto/filter-tasks.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly repository: TaskRepository) {}

  public async get(id: number): Promise<Task> {
    const found = await this.repository.findOne(id);
    if (!found) throw new NotFoundException(`Task number ${id} does not exist.`);
    return found;
  }

  public async list(request?: FilterTasksRequest): Promise<Task[]> {
    return await this.repository.filter(request);
  }

  public async create(request: CreateTaskRequest): Promise<Task> {
    return await this.repository.create({ status: TaskStatus.OPEN, ...request });
  }

  public async update(id: number, request: UpdateTaskRequest): Promise<Task> {
    return await this.repository.save({ id, ...request });
  }

  public async changeStatus(id: number, request: ChangeTaskStatusRequest): Promise<Task> {
    return await this.repository.save({ id, status: request.status });
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

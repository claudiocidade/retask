import { EntityRepository, Repository } from "typeorm";
import { FilterTasksRequest } from "./dto/filter-tasks.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async filter(request: FilterTasksRequest): Promise<Task[]> {
    const { status, search } = request;
    const query = this.createQueryBuilder('task');
    if (status) query.andWhere('task.status = :staus', { status });
    if (search) query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` });
    return await query.getMany();
  }
}
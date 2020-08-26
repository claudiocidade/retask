import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ChangeTaskStatusRequest } from "../dto/change-task-status.dto";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly validValues: TaskStatus[];
  constructor() {
    this.validValues = [
      TaskStatus.OPEN,
      TaskStatus.IN_PROGRESS,
      TaskStatus.DONE,
    ];
  }

  public transform(request: ChangeTaskStatusRequest): any {
    if (!this.isStatusValid(request.status)) 
      throw new BadRequestException(`'${request.status}' status is invalid.`)
    return request;
  }

  private isStatusValid(status: TaskStatus): boolean {
    return this.validValues.includes(status);
  }
}
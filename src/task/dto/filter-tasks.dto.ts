import { TaskStatus } from "../task.model";
import { IsOptional, IsIn } from "class-validator";

export class FilterTasksRequest {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
  @IsOptional()
  search: string;
}
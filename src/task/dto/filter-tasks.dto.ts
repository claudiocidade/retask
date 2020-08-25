import { TaskStatus } from "../task.model";

export class FilterTasksRequest {
  status: TaskStatus;
  search: string;
}
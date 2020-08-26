import { TaskStatus } from "../task-status.enum";

export class ChangeTaskStatusRequest {
  status: TaskStatus;
}
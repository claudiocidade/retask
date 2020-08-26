import { IsNotEmpty } from 'class-validator';

export class CreateTaskRequest {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
import { TodoPriority, TodoStatus } from '../entities/todo.entity';
import {
  IsString,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  name: string;

  @IsDateString()
  dueDate: Date;

  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

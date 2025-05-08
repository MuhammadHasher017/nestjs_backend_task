import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { TodoPriority, TodoStatus } from '@/modules/todo/entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2025-05-15' })
  @IsDateString()
  dueDate: Date;

  @IsEnum(TodoStatus)
  status: TodoStatus;

  @ApiProperty({ enum: TodoPriority, example: TodoPriority.BLUE })
  @IsEnum(TodoPriority)
  priority: TodoPriority;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}

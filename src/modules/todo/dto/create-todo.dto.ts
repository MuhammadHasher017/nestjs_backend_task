import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { TodoPriority, TodoStatus } from '@/modules/todo/entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({ example: 'Complete project documentation' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the todo task',
    example: 'Detailed description of what needs to be done',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-05-15T12:00:00Z' })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ enum: TodoStatus, example: TodoStatus.PENDING })
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

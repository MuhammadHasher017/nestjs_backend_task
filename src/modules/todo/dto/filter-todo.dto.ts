import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBooleanString, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

import { TodoPriority, TodoStatus } from '@/modules/todo/entities/todo.entity';

export class FilterTodoDto {
  @ApiProperty({ required: false, enum: TodoStatus, description: 'Filter by task status' })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;

  @ApiProperty({ required: false, enum: TodoPriority, description: 'Filter by task priority' })
  @IsOptional()
  @IsEnum(TodoPriority)
  priority?: TodoPriority;

  @ApiProperty({ required: false, description: 'Filter by active status (true or false)' })
  @IsOptional()
  @IsBooleanString()
  isActive?: string;

  @ApiProperty({ required: false, description: 'Search in task name' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: false,
    enum: ['dueDate', 'createdAt'],
    default: 'createdAt',
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsString()
  sortBy?: 'dueDate' | 'createdAt';

  @ApiProperty({
    required: false,
    enum: ['ASC', 'DESC'],
    default: 'DESC',
    description: 'Sort order',
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';

  @ApiProperty({
    required: false,
    type: Number,
    default: 1,
    description: 'Page number (starts from 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number = 1;

  @ApiProperty({ required: false, type: Number, default: 10, description: 'Items per page' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number = 10;
}

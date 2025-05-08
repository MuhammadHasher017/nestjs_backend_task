import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoStatus {
  PENDING = 'Pending',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  PAUSED = 'Paused',
}

export enum TodoPriority {
  RED = 'Red',
  YELLOW = 'Yellow',
  BLUE = 'Blue',
}

@Entity()
export class Todo {
  @ApiProperty({ description: 'The unique identifier', example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the todo task',
    example: 'Complete project documentation',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The description of the todo task',
    example: 'Detailed description of what needs to be done',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'The due date of the task', example: '2025-05-15T12:00:00Z' })
  @Column({ type: 'timestamp' })
  dueDate: Date;

  @ApiProperty({
    description: 'The status of the task',
    enum: TodoStatus,
    example: TodoStatus.PENDING,
  })
  @Column({ type: 'enum', enum: TodoStatus })
  status: TodoStatus;

  @ApiProperty({
    description: 'The priority of the task',
    enum: TodoPriority,
    example: TodoPriority.BLUE,
  })
  @Column({ type: 'enum', enum: TodoPriority })
  priority: TodoPriority;

  @ApiProperty({ description: 'The creation date of the task', example: '2025-05-08T12:00:00Z' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the task', example: '2025-05-09T12:00:00Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({
    description: 'The deletion date of the task (null if not deleted)',
    example: null,
  })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ApiProperty({ description: 'Whether the task is active', example: true })
  @Column({ default: true })
  isActive: boolean;
}

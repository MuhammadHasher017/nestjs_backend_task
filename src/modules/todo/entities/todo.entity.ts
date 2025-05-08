import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
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
  @PrimaryGeneratedColumn()
      id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TodoStatus })
  status: TodoStatus;

  @Column({ type: 'enum', enum: TodoPriority })
  priority: TodoPriority;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;
}

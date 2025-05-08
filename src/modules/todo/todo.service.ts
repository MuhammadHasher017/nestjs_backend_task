import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from '@modules/todo/dto/create-todo.dto';
import { FilterTodoDto } from '@modules/todo/dto/filter-todo.dto';
import { UpdateTodoDto } from '@modules/todo/dto/update-todo.dto';
import { Todo } from '@modules/todo/entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  async findAll(
    filterDto: FilterTodoDto,
  ): Promise<{ data: Todo[]; total: number; page: number; limit: number }> {
    const {
      status,
      priority,
      isActive,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = filterDto;
    const qb = this.todoRepository.createQueryBuilder('todo');

    if (status) qb.andWhere('todo.status = :status', { status });
    if (priority) qb.andWhere('todo.priority = :priority', { priority });
    if (typeof isActive !== 'undefined')
      qb.andWhere('todo.isActive = :isActive', { isActive: isActive === 'true' });
    if (search) {
      qb.andWhere('(todo.name ILIKE :search OR todo.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    qb.orderBy(`todo.${sortBy}`, sortOrder as 'ASC' | 'DESC');
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    const todo = await this.findOne(id);
    await this.todoRepository.remove(todo);
  }
}

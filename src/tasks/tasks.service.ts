import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskRequestDTO } from './dtos/create-task.dto';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    create(createTaskDto: CreateTaskRequestDTO) {
        const newTask = new this.taskModel(createTaskDto);

        return newTask.save();
    }

    findAll() {

    }

    findById(id: number) { }

    update() { }

    delete() { }

}

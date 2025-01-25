import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskRequestDTO } from './dtos/create-task.dto';
import { UpdateTaskDTO } from './dtos/update-task.dto';
import { TASK_EXCEPTIONS, TASK_MESSAGES } from './constants/tasks.constants';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    create(createTaskDto: CreateTaskRequestDTO) {
        const newTask = new this.taskModel(createTaskDto);

        return newTask.save();
    }

    async findById(id: string) {
        return await this.taskModel.findById(id).exec();
    }

    async findByUserId(id: string) {
        return await this.taskModel
            .find({ owner: id })
            .populate('owner')
            .exec();
    }

    async update(taskId: string, updateTaskDto: UpdateTaskDTO, currentUserId: string) {
        const task = await this.findById(taskId);

        if (!task) {
            throw new NotFoundException(TASK_EXCEPTIONS.TASK_NOT_FOUND)
        }

        if (task.owner !== currentUserId) {
            throw new NotFoundException(TASK_EXCEPTIONS.TASK_NOT_OWNED)
        }

        Object.assign(task, updateTaskDto);

        return await task.save();
    }

    async delete(taskId: string, userId: string) {
        const task = await this.findById(taskId);

        if (!task) {
            throw new NotFoundException(TASK_EXCEPTIONS.TASK_NOT_FOUND)
        }

        if (task.owner !== userId) {
            throw new NotFoundException(TASK_EXCEPTIONS.TASK_NOT_OWNED)
        }

        await this.taskModel.deleteOne({ _id: taskId }).exec();

        return TASK_MESSAGES.TASK_DELETED;
    }

}

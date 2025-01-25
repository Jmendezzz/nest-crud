import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDTO } from './dtos/create-task.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UserId } from 'src/common/decorators/user-id/user-id.decorator';
import { UpdateTaskDTO } from './dtos/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor (private readonly tasksService: TasksService){}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    create(@Body() createTaskDTO: CreateTaskRequestDTO, @UserId() currentUserId: string){
        return this.tasksService.create({
            ...createTaskDTO,
            owner: currentUserId
        })
    }

    @Get('/me')
    @UseGuards(AuthGuard)
    findMyTasks(@UserId() currentUserId: string){
        return this.tasksService.findByUserId(currentUserId)
    }


    @Put(":taskId")
    @UseGuards(AuthGuard)
    update(@Param('taskId') taskId:string, @Body() UpdateTaskDTO, @UserId() currentUserId){
        return this.tasksService.update(taskId, UpdateTaskDTO, currentUserId)
    }

    @Delete(":taskId")
    @UseGuards(AuthGuard)
    delete(@Param('taskId') taskId:string, @UserId() currentUserId){
        return this.tasksService.delete(taskId, currentUserId)
    }

}

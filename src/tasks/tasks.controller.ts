import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskRequestDTO } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor (private readonly tasksService: TasksService){}

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createTaskDTO: CreateTaskRequestDTO){

    }

    @Get()
    findAll(){
        return 'Hello this is my first NestJs Endpoint, Enjoy it! 😁'
    }

    @Get(':id')
    findById(@Param('id') id: number){
        return `Finding by id ${id}`
    }

    @Put(":id")
    update(){}

    @Delete(":id")
    delete(){}

}

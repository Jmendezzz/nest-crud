import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "../eums/task-status.enum";
import { TASK_VALIDATION } from "../constants/tasks.constants";

export class UpdateTaskDTO {
    @IsOptional()
    @IsString()
    @MaxLength(TASK_VALIDATION.TITLE_MAX_LENGTH)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(TASK_VALIDATION.DESCRIPTION_MAX_LENGTH)
    description: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
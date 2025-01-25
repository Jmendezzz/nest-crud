import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "../eums/task-status.enum";
import { TASK_VALIDATION } from "../constants/tasks.constants";

export class CreateTaskRequestDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(TASK_VALIDATION.TITLE_MAX_LENGTH)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(TASK_VALIDATION.DESCRIPTION_MAX_LENGTH)
    description: string;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status?: TaskStatus;
}
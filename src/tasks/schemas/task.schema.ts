import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { TaskStatus } from "../eums/task-status.enum";
import { Types } from "mongoose";

@Schema()
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: TaskStatus})
    status: TaskStatus;

    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    owner: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
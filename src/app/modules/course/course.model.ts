import { Schema, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{_id: false}) // _id bydefault dibe na preRequiste course er khetre
const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    prefix: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: Number,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})

export const Course =  model<TCourse>('Course',courseSchema);
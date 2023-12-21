import { Types } from "mongoose"

export type TAcademicDepartment = {
    name: string,
    academicFaculty: Types.ObjectId; // academic faculty er id ekhane store korbo reference hisebe
}
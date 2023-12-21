import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty'
    }

},{timestamps: true})


// //same name e multiple dept kroa jabe na
academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExist = await AcademicDepartment.findOne({name: this.name})
    if(isDepartmentExist){
        throw new AppError(404,"This department is already exist.");
    }
    next();
})

//wrong id diye update korle error dibe
academicDepartmentSchema.pre('findOneAndUpdate', async function(next){
    const query = this.getQuery(); // this.getQuery update er khetree j query diey find kori sei query ta pabo _id: id pabo
    const isDepartmentExist = await AcademicDepartment.findOne({query})
    if(!isDepartmentExist){
        throw new AppError(404,"This department does not exist")
    }
    next()

})
export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema)
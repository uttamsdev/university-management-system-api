import { Schema, model } from 'mongoose';
import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './AcademicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName
    },
    year: {
      type: String,
      required: true,
     
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
);


//pre middleware eta check korbe j same year e same semester create hocce kina
academicSemesterSchema.pre('save', async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })

    if(isSemesterExists){
        throw new Error("semester is already exist")
    }
    next()
})
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)
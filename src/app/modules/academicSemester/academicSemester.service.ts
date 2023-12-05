import { academicSemesterNameCodeMapper } from "./AcademicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async(payLoad: TAcademicSemester) =>{
    //semester name --> semester code map

    //ekhane ensure kora hocce j Autumn er value 01 ei dite hobe na hole error dibe and so on...
  
  

    if(academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code){
        throw new Error("Invalid semester code...");
    }
    const result = await AcademicSemester.create(payLoad)
    return result
}

const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };
  
  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };
  
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB
}
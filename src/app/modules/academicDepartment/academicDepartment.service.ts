import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payLoad);
    return result;
}


const getAllAcademicDepartmentsFromDB = async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty'); //academicFaculty is a filedname here
    return result;
}

const getSingleAcademicDepartment = async (id: string) => {
    const result = await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
}

const updateAcademicDepartmentIntoDb = async (id:string, payLoad: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payLoad, {
        new: true,
      });
      return result;
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsFromDB,
    getSingleAcademicDepartment,
    updateAcademicDepartmentIntoDb
}
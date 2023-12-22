
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0
    }).sort({createdAt: -1}).lean() //lean korle query fast hobe.. 

    return lastStudent?.id ? lastStudent.id : undefined //substring 6 mane 6 ghor bad dibe . id theke last er 4 digit  e inc hobe
}
//year semestercode 4 digit number
   //function to generate id autometically
   export const generateStudentId= async(payLoad: TAcademicSemester) => {

    //first time 0000
    let currentId = (0).toString(); //0000 by default
    const lastStudentId = await findLastStudentId();
    //2030 01 0001
    const lastStudentSemesterCode = lastStudentId?.substring(4,6); // 4 index theke 6 index er ag porjonto pabe 
    const lastStudentYear = lastStudentId?.substring(0,4);
    const currentSemesterCode = payLoad.code;
    const currentYear = payLoad.year;

    //academic year/semester code change hole currentId auto 0000 e reset hobe
    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear){
        currentId = lastStudentId.substring(6) // 6 index theke last porjonto nibe
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4,'0');

    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
    return incrementId;
   }


   // Faculty ID
export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
      {
        role: 'faculty',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
  };
  
  export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();
  
    if (lastFacultyId) {
      currentId = lastFacultyId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `F-${incrementId}`;
  
    return incrementId;
  };
  
  // Admin ID
  export const findLastAdminId = async () => {
    const lastAdmin = await User.findOne(
      {
        role: 'admin',
      },
      {
        id: 1,
        _id: 0,
      },
    )
      .sort({
        createdAt: -1,
      })
      .lean();
  
    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
  };
  
  export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await findLastAdminId();
  
    if (lastAdminId) {
      currentId = lastAdminId.substring(2);
    }
  
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  
    incrementId = `A-${incrementId}`;
    return incrementId;
  };

import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne({
        role: 'student'
    }, {
        id: 1,
        _id: 0
    }).sort({createdAt: -1}).lean() //lean korle query fast hobe.. 

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined //substring 6 mane 6 ghor bad dibe . id theke last er 4 digit  e inc hobe
}
//year semestercode 4 digit number
   //function to generate id autometically
   export const generateStudentId= async(payLoad: TAcademicSemester) => {

    //first time 0000
    const currentId = await findLastStudentId() || (0).toString()//indicate 0000
    let incrementId = (Number(currentId) + 1).toString().padStart(4,'0');

    incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
    return incrementId;
   }

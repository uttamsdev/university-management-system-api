import { TStudent } from "../ student/student.interface";
import { Student } from "../ student/student.model";
import config from "../../config";
import {  TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
     //Create an user object
     const userData : Partial<TUser> = {}//Tuser er type k partial korse mane tuser er sob property cole asche kintu sob optional hisebe
     

    //if password is not given use default password
    userData.password = password || (config.default_password as string);

   //set student role
   userData.role = 'student';


   //set manually generated id
   userData.id = '2030100001'

   //create a user
    const newUser = await User.create(userData);

    //create a student
    if(Object.keys(newUser).length){//object.keys diye newUser ta k array banano holo ebong newUser er length thaklei bujbo user create hoise
      //set id, _id as user

      //student create korar somoy user id student er id hisebe bosabo embedded hobe && user er _id ta user: filed e objectId hisebe referencing korbo
      studentData.id = newUser.id; //embedding id
      studentData.user = newUser._id; //reference id

      const newStudent = await Student.create(studentData);
      return newStudent;
    }
    // return newUser;
  };

  export const UserServices = {
    createStudentIntoDB
  }
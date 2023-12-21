import mongoose from "mongoose";
import { TStudent } from "../ student/student.interface";
import { Student } from "../ student/student.model";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
     //Create an user object
     const userData : Partial<TUser> = {}//Tuser er type k partial korse mane tuser er sob property cole asche kintu sob optional hisebe
     
    //if password is not given use default password
    userData.password = password || (config.default_password as string);

   //set student role
   userData.role = 'student';

   //find academic semester info
   const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester)
  //  console.log("adx:",admissionSemester)


  //TODO: Transaction & rollback 
  const session = await mongoose.startSession(); // starting session
  try {
    //starting the transaction
    session.startTransaction(); 
      //set manually generated id
   userData.id = await generateStudentId(admissionSemester as TAcademicSemester);

   //create a user (transaction -> 1)
   //transaction use korar karone newUser array hoie jabe
    const newUser = await User.create([userData],{session}); //array hisebe userData pathacchi transaction use korar jonno session object akare dite hobe. newUser ekta array return korbe


    if(!newUser.length){//new user create na hole
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

      //set id, _id as user

      //student create korar somoy user id student er id hisebe bosabo embedded hobe && user er _id ta user: filed e objectId hisebe referencing korbo
      payLoad.id = newUser[0].id; //embedding id
      payLoad.user = newUser[0]._id; //reference id

          //create a student (Transaction --> 2)
      const newStudent = await Student.create([payLoad], {session});

      if(!newStudent.length){
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
      }
      //commit the transaction
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
    
  } catch (error) {
    await session.abortTransaction(); //kono error hole transaction ta abort kore dibe.
    await session.endSession();
    throw new Error("Failed to create student")
  }
 
    // return newUser;
  };

  export const UserServices = {
    createStudentIntoDB
  }
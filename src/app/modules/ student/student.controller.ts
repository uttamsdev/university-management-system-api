import { Request, Response } from 'express';
import { studentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //Creating schema validation uisng Joi
    


    
    //send response
    const { student: studentData } = req.body; //student object recv kortese req.body theke //studentData name alias

    
    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData)
       //will call service function to send this data
       const result = await studentServices.createStudentIntoDB(zodParsedData);
    

    console.log(req.body);
 
    //send response to user
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error : any) {
    // console.log(error);
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentDataFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (error : any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    // const sudentId = req.params.studentId;
    //it can be written as
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};



const deleteStudent = async (req: Request, res: Response) => {
  try {
    // const sudentId = req.params.studentId;
    //it can be written as
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Something went wrong.',
      data: error,
    });
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

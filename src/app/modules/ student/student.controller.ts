import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
// import studentValidationSchema from './student.validation';



const getAllStudents = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const result = await studentServices.getAllStudentDataFromDB();
    res.status(200).json({
      success: true,
      message: 'Student is retrived successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => { //NextFunction for global error 
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
  } catch (err) {
   next(err) //global error handler
  }
};



const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (err) {
    next(err);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent
};

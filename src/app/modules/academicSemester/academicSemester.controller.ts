import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync( async (req, res) => { //req: Request, res: Response, next: NextFunction req, res, r next er type define kore de RequestHandler Type


    // const { password, student: studentData } = req.body; //student object recv kortese req.body theke //studentData name alias
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester  is created successfully',
      data: result,
    });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semesters are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });
  
  const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
      semesterId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is retrieved succesfully',
      data: result,
    });
  });
  export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester

  }
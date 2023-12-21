import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync( async (req, res) => { //req: Request, res: Response, next: NextFunction req, res, r next er type define kore de RequestHandler Type

    // const { password, student: studentData } = req.body; //student object recv kortese req.body theke //studentData name alias
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty  is created successfully',
      data: result,
    });
});

const getAllAcademicAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculties are retrieved successfully',
      data: result,
    });
  });
  
  const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFaculty(facultyId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is retrieved successfully',
      data: result,
    });
  });
  
  const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
      facultyId,
      req.body,
    );
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated succesfully',
      data: result,
    });
  });
  export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty
  }
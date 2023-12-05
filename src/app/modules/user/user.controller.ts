import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync( async (req, res) => { //req: Request, res: Response, next: NextFunction req, res, r next er type define kore de RequestHandler Type


    const { password, student: studentData } = req.body; //student object recv kortese req.body theke //studentData name alias
    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students is created successfully',
      data: result,
    });
});

  export const UserControllers = {
    createStudent
  }
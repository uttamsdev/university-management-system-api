import express from 'express';
import { UserControllers } from './user.controller';

import ValidateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../ student/student.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
const router = express.Router();

//middleware
// const shenaBahini = (req: Request, res : Response, next: NextFunction) =>{
// console.log("I am a shenabahini")
// next()
// }



router.post(
  '/create-student',
  ValidateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  ValidateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  ValidateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
export const UserRoutes = router;

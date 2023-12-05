import express from 'express';
import { UserControllers } from './user.controller';

import ValidateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../ student/student.validation';
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
export const UserRoutes = router;

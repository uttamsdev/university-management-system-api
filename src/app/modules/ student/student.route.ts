import express from 'express';
import { StudentControllers } from './student.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

//router will call controller function
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch('/:studentId',ValidateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;

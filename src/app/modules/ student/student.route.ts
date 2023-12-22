import express from 'express';
import { StudentControllers } from './student.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

//router will call controller function
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch('/:id',ValidateRequest(updateStudentValidationSchema), StudentControllers.updateStudent);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;

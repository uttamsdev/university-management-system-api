import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import ValidateRequest from '../../middleware/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';

const router = express.Router();


router.post('/create-academic-semester', ValidateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema) ,AcademicSemesterControllers.createAcademicSemester)
//router will call controller function
// router.get('/', StudentControllers.getAllStudents);
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.delete('/:studentId', StudentControllers.deleteStudent);
router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );
  
  router.patch(
    '/:semesterId',
    ValidateRequest(
      AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
    ),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  
  router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
export const AcademicSemesterRoute = router;

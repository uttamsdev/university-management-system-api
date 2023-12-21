import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
const router = express.Router();


router.post('/create-academic-faculty', ValidateRequest(AcademicFacultyValidation.createAcademicFaultyValidationSchema) , AcademicFacultyControllers.createAcademicFaculty)

router.get(
    '/:facultyId',
    AcademicFacultyControllers.getSingleAcademicFaculty,
  );
  
  router.patch(
    '/:facultyId',
    ValidateRequest(
      AcademicFacultyValidation.updateAcademicFaultyValidationSchema,
    ),
    AcademicFacultyControllers.updateAcademicFaculty,
  );
  
  router.get('/', AcademicFacultyControllers.getAllAcademicAcademicFaculties);
export const AcademicFacultyRoutes = router;

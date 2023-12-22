import express from 'express';
import ValidateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router();


router.post('/create-course', ValidateRequest(CourseValidations.createCourseValidationSchema) , CourseControllers.createCourse)

router.get(
    '/:id',
    CourseControllers.getSingleCourse
  );
  router.delete(
    '/:id',
    CourseControllers.deleteCourse
  );
  
  router.patch(
    '/:id',
    ValidateRequest(
      CourseValidations.updateCourseValidationSchema,
    ),
    CourseControllers.updateCourse,
  );
  
  router.get('/', CourseControllers.getAllCourses);
export const CourseRoutes = router;

import express from 'express';
import { StudentRoutes } from '../modules/ student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/course/course.route';
const router = express.Router();

const moduleRoutes = [
    {
      path: '/users',
      route: UserRoutes,
    },
    {
      path: '/students',
      route: StudentRoutes,
    },
    {
      path: '/faculties',
      route: FacultyRoutes,
    },
    {
      path: '/admins',
      route: AdminRoutes,
    },
    {
      path: '/academic-semesters',
      route: AcademicSemesterRoutes,
    },
    {
      path: '/academic-faculties',
      route: AcademicFacultyRoutes,
    },
    {
      path: '/academic-departments',
      route: AcademicDepartmentRoutes,
    },
    {
      path: '/courses',
      route: CourseRoutes,
    },
    // {
    //   path: '/courses',
    //   route: CourseRoutes,
    // },
  ];

moduleRoutes.forEach(route => router.use(route.path, route.route)) //loop caliye route e jacchi redandency komate
export default router;
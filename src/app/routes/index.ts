import express from 'express';
import { StudentRoutes } from '../modules/ student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/academic-semesters",
        route: AcademicSemesterRoute
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route)) //loop caliye route e jacchi redandency komate
export default router;
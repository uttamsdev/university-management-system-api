import express from 'express';
import { StudentRoutes } from '../modules/ student/student.route';
import { UserRoutes } from '../modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/students",
        route: StudentRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route)) //loop caliye route e jacchi redandency komate
export default router;
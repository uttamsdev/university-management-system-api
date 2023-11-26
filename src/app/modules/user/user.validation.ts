import { z } from "zod";

const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'Password must be string'
    }).max(20, {message: 'Password cannot be more than 20 character'}).optional(),
})
//only password rakchi karon baki gulo dorkar nai client theke asbe na
export const UserValidation = {
    userValidationSchema
}
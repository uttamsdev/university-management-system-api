import { z } from "zod";

const createAcademicFaultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic must be string'
        })
    })
})

const updateAcademicFaultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic must be string'
        })
    })
})
export const AcademicFacultyValidation = {
    createAcademicFaultyValidationSchema,
    updateAcademicFaultyValidationSchema
}
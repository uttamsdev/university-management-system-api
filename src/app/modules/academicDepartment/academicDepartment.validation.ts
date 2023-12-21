import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be string',
            required_error: "Name is required"
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty must be string',
            required_error: ''
        })
    })
})

const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'Academic department must be string',
            required_error: "Name is required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty must be string',
            required_error: ''
        }).optional()
    })
})
export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}
import { z } from "zod";

const preRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(preRequisiteCourseValidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
})

const facultiesWithCourseValidationSchema = z.object({
    body: z.object({
        faculties: z.array(z.string()), //string typer array
    
    })
})
//for update
const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional()
})
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z.array(updatePreRequisiteCourseValidationSchema).optional(),
        isDeleted: z.boolean().optional()
    })
})

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema
}
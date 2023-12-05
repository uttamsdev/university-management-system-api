import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './AcademicSemester.constant';
const createAcademicSemesterValidationSchema = z.object({
    body:  z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),//[string, ...string[]] eta die bojhai string er array
        startMonth: z.enum([...Months] as [string, ...string[]]),
        endMonth: z.enum([...Months] as [string, ...string[]]),
    })
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};

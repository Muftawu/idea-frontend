import * as z from "zod";

// CLASSROOM //
const ClassRoomSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    teacher: z.string().optional(),
    group: z.string().optional(),
    studentCount: z.number()
})

// USER //
const UserSchema = z.object({
    id: z.string().optional(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.string(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional()
})

// STAFF //
const StaffStatsSchema = z.object({
    maleCount: z.number(),
    femaleCount: z.number(),
    malePercentage: z.number(),
    femalePercentage: z.number()
})

const StaffInfoSchema = z.object({
    id: z.string().optional(),
    staffId: z.string(),
    personalInfo: UserSchema,
    placeOfBirth: z.string().optional(),
    academicQualification: z.string().optional(),
    professionalQualification: z.string().optional(),
    placeOfResidence: z.string().optional(),
    hometown: z.string().optional(),
    bankAccNo: z.string().optional(),
    socialSecNo: z.string().optional(),
})

// SUBJECT //
const SubjectSchema = z.object({
    id: z.string().optional(),
    classGroup: z.string(),
    name: z.string(),
    scoreType: z.string(),
    scoreOptions: z.array(z.string()).optional(),
})


export type ClassRoomSchemaT = z.infer<typeof ClassRoomSchema>
export type UserSchemaT = z.infer<typeof UserSchema>
export type StaffT = z.infer<typeof StaffInfoSchema>
export type SubjectT = z.infer<typeof SubjectSchema>
export type StaffStatSchemaT = z.infer<typeof StaffStatsSchema>

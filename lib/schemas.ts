import * as z from "zod";

const ClassRoomSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    teacher: z.string().optional(),
    group: z.string().optional(),
    studentCount: z.number()
})

const UserSchema = z.object({
    id: z.string().optional(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
    gender: z.string(),
    dateOfBirth: z.string().optional(),
    nationality: z.string().optional()
})

const StaffInfoSchema = z.object({
    id: z.string().optional(),
    staffId: z.string(),
    personalInfo: UserSchema,
    placeOfBirth: z.string().optional(),
    academicQualification: z.string().optional(),
    professionalQualification: z.string().optional(),
    placeOfResidence: z.string().optional(),
    homeTown: z.string().optional(),
    bankAccountNo: z.string().optional(),
    socialSecurityNo: z.string().optional(),
})

export type ClassRoomSchemaT = z.infer<typeof ClassRoomSchema>
export type UserSchemaT = z.infer<typeof UserSchema>
export type StaffT= z.infer<typeof StaffInfoSchema>

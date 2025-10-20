import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  teachers: z.array(z.string()),
});

export type SubjectInput = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassInput = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(4, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  supervisedClasses: z.array(z.string()).optional(),
  teachingClasses: z.array(z.string()).optional(),
});

export type TeacherInput = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(4, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().optional(),
  address: z.string(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  img: z.string().optional(),
  gradeId: z.coerce.number().min(1, { message: "Grade is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
  parentId: z.string().min(1, { message: "Parent is required" }),
});

export type StudentInput = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Exam name is required" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  lessonId: z.coerce.number({ message: "Lesson id is required" }),
});

export type ExamInput = z.infer<typeof examSchema>;

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(4, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional(),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string(),
  address: z.string(),
  students: z.array(z.string()),
});

export type ParentInput = z.infer<typeof parentSchema>;

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Exam name is required" }),
  startDate: z.coerce.date({ message: "Start date is required" }),
  endDate: z.coerce.date({ message: "End date is required" }),
  lessonId: z.coerce.number({ message: "Lesson id is required" }),
});

export type AssignmentInput = z.infer<typeof assignmentSchema>;

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Lesson name is required" }),
  day: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], {
    message: "Day is required",
  }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  subjectId: z.coerce.number().min(1, { message: "Subject id is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
  teacherId: z.string().min(1, { message: "Teacher is required" }),
});

export type LessonInput = z.infer<typeof lessonSchema>;

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event title is required" }),
  description: z.string().min(1, { message: "Event description is required" }),
  startTime: z.coerce.date({ message: "Start time is required" }),
  endTime: z.coerce.date({ message: "End time is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
});

export type EventInput = z.infer<typeof eventSchema>;

export const announcementSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Event title is required" }),
  description: z.string().min(1, { message: "Event description is required" }),
  date: z.coerce.date({ message: "Date is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
});

export type AnnouncementInput = z.infer<typeof announcementSchema>;

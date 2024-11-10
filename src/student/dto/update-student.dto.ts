import { CreateStudentDto } from "./create-student.dto";

export interface UpdateStudentDto extends Partial<CreateStudentDto> {}

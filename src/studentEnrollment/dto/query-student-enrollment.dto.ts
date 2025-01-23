import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryStudentEnrollmentDto extends PaginationDto {
	studentId: string;
	enrollmentPeriodId: string;
	sedeId: string;
}

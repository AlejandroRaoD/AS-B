import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryEnrollmentPeriodDto extends PaginationDto {
	year?: number;
	step?: number;
}

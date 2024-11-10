import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryStudentDto extends PaginationDto {
	name?: string;
	lastname?: string;
	birthday?: string;
	CI?: string;
	email?: string;
	gender?: string;
	address?: string;
	phone_number?: string;
	hasInstrument?: string;
}

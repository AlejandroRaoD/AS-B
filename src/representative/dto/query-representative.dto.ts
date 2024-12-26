import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryRepresentativeDto extends PaginationDto {
	name?: string;
	lastname?: string;
	birthday?: string;
	nationality?: string;
	CI?: string;
	email?: string;
	gender?: string;
	address?: string;
	phone_number?: string;
	job?: string;
}

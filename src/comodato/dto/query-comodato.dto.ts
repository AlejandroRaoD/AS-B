import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryComodatoDto extends PaginationDto {
	instrumentId?: string;
	studentId?: string;
	status?: string;
	initDate?: string;
	endDate?: string;
	contractNumber?: string;
}

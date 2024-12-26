import { PaginationDto } from "../../../common/dtos/pagination.dto";

export interface QueryFiamDto extends PaginationDto {
	catedraId?: string;
	employeeId?: string;
	type?: string;
}

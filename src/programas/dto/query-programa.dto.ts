import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryProgramaDto extends PaginationDto {
	name?: string;
	sedeId?: string;
	directorId?: string;
}

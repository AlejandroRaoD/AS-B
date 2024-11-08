import { PaginationDto } from "../../../common/dtos/pagination.dto";

export interface QuerySedeDto extends PaginationDto {
	name?: string;
	nucleoId?: String;
}

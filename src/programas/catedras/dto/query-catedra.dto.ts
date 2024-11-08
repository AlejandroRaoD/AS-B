import { PaginationDto } from "../../../common/dtos/pagination.dto";

export interface QueryCatedraDto extends PaginationDto {
	name?: string;
	programaId?: string;
}

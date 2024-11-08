import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryNucleoDto extends PaginationDto {
	name?: string;
}

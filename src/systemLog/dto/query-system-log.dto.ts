import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QuerySystemLogDto extends PaginationDto {
	userId?: string;
}

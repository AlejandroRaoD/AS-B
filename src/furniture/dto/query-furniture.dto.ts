import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryFurnitureDto extends PaginationDto {
	name?: string;
	quantity?: string;
	description?: string;
	serialNumber?: string;
	brand?: string;
	model?: string;
	status?: string;
	observation?: string;
	localLocation?: string;
	sedeId?: string;
}

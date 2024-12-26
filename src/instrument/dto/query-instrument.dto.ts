import { PaginationDto } from "../../common/dtos/pagination.dto";

export interface QueryInstrumentDto extends PaginationDto {
	name?: string;
	description?: string;
	serialNumber?: string;
	brand?: string;
	model?: string;
	status?: string;
	observation?: string;
	sedeId?: string;
}

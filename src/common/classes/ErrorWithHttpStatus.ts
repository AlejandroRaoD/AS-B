export class ErrorWithHttpStatus extends Error {
	constructor(readonly status: number, readonly message: string, ...params) {
		super(...params);
	}
}

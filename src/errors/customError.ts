export class CustomError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(statusCode: number, errorCode: string, message?: string) {
    super(message || errorCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}

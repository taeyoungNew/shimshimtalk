import { AppError } from "./AppError";
export class JwtError extends AppError {
  constructor(message = "Bad Request", code?: any) {
    super(message, 400, code);
  }
}

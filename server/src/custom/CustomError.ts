import { ExternalError } from "../types/externalError";

export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statuscode: number) {
    super(message);
    this.statusCode = statuscode;
  }
}

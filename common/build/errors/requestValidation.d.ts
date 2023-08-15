import { CustomError } from './customError';
import { ValidationError } from 'express-validator';
export declare class RequestValidationError extends CustomError {
    errors: ValidationError[];
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErrors(): {
        message: any;
        field: "field" | "unknown_fields" | "alternative" | "alternative_grouped";
    }[];
}

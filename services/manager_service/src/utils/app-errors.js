
const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
}

class AppError extends Error {
    constructor(name, statusCode, description, isOperational, errorStack, logingErrorResponse) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}

class APIError extends AppError {
    constructor(name, statusCode = STATUS_CODES.INTERNAL_ERROR, description ='Internal Server Error', isOperational = true) {
        super(name, statusCode, description, isOperational);
    }
}

class BadRequestError extends AppError {
    constructor(description = 'Bad request', logingErrorResponse) {
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description, true, false, logingErrorResponse);
    }
}

class ValidationError extends AppError {
    constructor(description = 'Validation Error', errorStack) {
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST, description, true, errorStack);
    }
}

class NotFoundError extends AppError {
    constructor(description = 'Not Found', errorStack) {
        super('NOT FOUND', STATUS_CODES.NOT_FOUND, description, true, errorStack);
    }
}

module.exports = {
    AppError,
    APIError,
    BadRequestError,
    ValidationError,
    NotFoundError,
    STATUS_CODES,
}
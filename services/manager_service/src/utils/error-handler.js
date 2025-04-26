
const { createLogger, transports, format } = require('winston');
const { AppError } = require('./app-errors');

const LogErrors = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log' })
    ]
});

class ErrorLogger {
    constructor() {}
    async logError(err) {
        console.log('==================== Start Error Logger ===============');
        LogErrors.log({
            private: true,
            level: 'error',
            message: `${JSON.stringify(err)}`
        });
        console.log('==================== End Error Logger ===============');
        return false;
    }

    isTrustError(error) {
        if (error instanceof AppError) {
            return error.isOperational;
        } else {
            return false;
        }
    }
}

const ErrorHandler = async(err, req, res, next) => {
    const errorLogger = new ErrorLogger();

    process.on('unhandledRejection', (reason, promise) => {
        console.log(reason, 'UNHANDLED REJECTION at Promise', promise);
        throw reason;
    });

    process.on('uncaughtException', (error) => {
        console.log(error, 'UNCAUGHT EXCEPTION thrown');
        errorLogger.logError(error);
    });

    if (err) {
        await errorLogger.logError(err);

        if (errorLogger.isTrustError(err)) {
            if (err.errorStack) {
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({
                    message: errorDescription
                });
            }

            return res.status(err.statusCode).json({
                message: err.message
            });
        } else {

            return res.status(500).json({
                message: 'Something went wrong. Please try again later.'
            });
        }
    }

    next();
}

module.exports = ErrorHandler;
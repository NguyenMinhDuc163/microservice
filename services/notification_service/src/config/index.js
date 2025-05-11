
const dotEnv = require("dotenv");
const path = require("path");


const rootPath = path.resolve(__dirname, "../..");
const envPath = path.join(rootPath, ".env");


dotEnv.config({ path: envPath });

console.log('Loading environment variables from:', envPath);

module.exports = {
  PORT: process.env.PORT || 8005,
  DB_NAME: process.env.POSTGRES_DB || "notification_service",
  DB_USER: process.env.POSTGRES_USER || "postgres",
  DB_PASSWORD: process.env.POSTGRES_PASSWORD || "password",
  DB_HOST: process.env.POSTGRES_HOST || "localhost",
  DB_PORT: process.env.POSTGRES_PORT || 5432,
  APP_SECRET: process.env.APP_SECRET || "tkb!afj.tch6AUF8tut",
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || "LEAVE_EXCHANGE",
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "amqp://localhost",
  NOTIFICATION_SERVICE: "notification_service",
  CUSTOMER_SERVICE: "customer_service",
  LEAVE_REQUEST_SERVICE: "leave_request_service",
  EMPLOYEE_SERVICE: "employee_service",
  MANAGER_SERVICE: "manager_service",
  APPROVAL_SERVICE: "approval_service",
  LEAVE_SERVICE: "leave_service"
};
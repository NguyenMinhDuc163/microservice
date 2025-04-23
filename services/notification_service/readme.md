# Notification Service Docker Deployment

## Prerequisites
- Docker installed
- Docker Compose (optional)

## Build Docker Image
```bash
docker build -t notification_service .
```

## Run Docker Container
```bash
docker run -p 8005:8005 \
  -e PORT=8005 \
  -e POSTGRES_DB=notification_service \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_HOST=host.docker.internal \
  -e POSTGRES_PORT=5432 \
  -e APP_SECRET=tkb!afj.tch6AUF8tut \
  -e EXCHANGE_NAME=LEAVE_EXCHANGE \
  -e MSG_QUEUE_URL=amqp://host.docker.internal \
  notification_service
```

## Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Service port | 8005 |
| POSTGRES_DB | Database name | notification_service |
| POSTGRES_USER | Database username | postgres |
| POSTGRES_PASSWORD | Database password | - |
| POSTGRES_HOST | Database host | host.docker.internal |
| POSTGRES_PORT | Database port | 5432 |
| APP_SECRET | Application secret | - |
| EXCHANGE_NAME | RabbitMQ exchange name | LEAVE_EXCHANGE |
| MSG_QUEUE_URL | RabbitMQ connection URL | amqp://host.docker.internal |

## Troubleshooting
- Ensure all environment variables are correctly set
- Check network connectivity
- Verify Docker daemon is running
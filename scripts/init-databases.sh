#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE notification_service;
    CREATE DATABASE manager_service;
    GRANT ALL PRIVILEGES ON DATABASE notification_service TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE manager_service TO $POSTGRES_USER;
EOSQL
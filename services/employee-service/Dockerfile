# Sử dụng image OpenJDK làm base image
FROM openjdk:11 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file pom.xml và mã nguồn vào container
COPY pom.xml .
COPY src ./src

# Chạy Maven để build file JAR
RUN mvn clean package -DskipTests

# Sử dụng image OpenJDK nhẹ hơn để chạy ứng dụng
FROM openjdk:11-jre-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file JAR từ bước build
COPY --from=build /app/target/employee-service-0.0.1-SNAPSHOT.jar app.jar

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 8082

# Lệnh để chạy ứng dụng
CMD ["java", "-jar", "app.jar"]
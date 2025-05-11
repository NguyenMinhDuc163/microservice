# # Use a JDK base image
# FROM openjdk:17-jdk-slim

# # Set working directory
# WORKDIR /app

# COPY target/leaverequestservice-0.0.1-SNAPSHOT.jar app.jar

# # Expose port
# EXPOSE 8081

# # Run the jar
# ENTRYPOINT ["java", "-jar", "app.jar"]
##########################################
# Sử dụng image Maven để build ứng dụng Spring Boot
FROM maven:3.8.4-openjdk-17-slim AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy pom.xml và mã nguồn
COPY pom.xml .
COPY src ./src

# Build ứng dụng Spring Boot
RUN mvn clean package -DskipTests

# Sử dụng OpenJDK để chạy ứng dụng
FROM openjdk:17-jdk-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file JAR đã build từ bước trước
COPY --from=build /app/target/*.jar app.jar

# Expose port (có thể thay đổi nếu cần)
EXPOSE 8080

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

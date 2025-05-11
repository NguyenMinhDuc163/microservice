
# FROM maven:3.8-openjdk-17 AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests


# FROM openjdk:17-jdk-slim
# WORKDIR /app
# COPY --from=build /app/target/leaveservice-0.0.1-SNAPSHOT.jar app.jar
# EXPOSE 8088
# ENTRYPOINT ["java", "-jar", "app.jar"]
##############################################
# Sử dụng Maven để build ứng dụng Spring Boot
FROM maven:3.8-openjdk-17 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy pom.xml và mã nguồn
COPY pom.xml .
COPY src ./src

# Build ứng dụng Spring Boot và tạo file JAR (bỏ qua việc chạy tests)
RUN mvn clean package -DskipTests

# Sử dụng OpenJDK để chạy ứng dụng
FROM openjdk:17-jdk-slim

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file JAR đã build từ bước build
COPY --from=build /app/target/leaveservice-0.0.1-SNAPSHOT.jar app.jar

# Expose port (đảm bảo rằng bạn đang expose đúng port)
EXPOSE 8088

# Chạy ứng dụng Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]

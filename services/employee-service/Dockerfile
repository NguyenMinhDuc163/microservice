
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/employee-service-1.0-SNAPSHOT.jar employee-service.jar
EXPOSE 8082
CMD ["java", "-jar", "employee-service.jar", "--server.port=8082"]
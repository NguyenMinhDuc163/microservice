
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/approval-service-1.0-SNAPSHOT.jar approval-service.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "approval-service.jar", "--server.port=8083"]
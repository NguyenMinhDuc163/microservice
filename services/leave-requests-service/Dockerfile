# Use a JDK base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

COPY target/leaverequestservice-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 8081

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]

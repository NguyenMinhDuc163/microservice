# 📊 Microservices System - Analysis and Design

This document outlines the **analysis** and **design** process for your microservices-based system assignment. Use it to explain your thinking and architecture decisions.

---

## 1. 🎯 Problem Statement

_Describe the problem your system is solving._

- Who are the users?
- What are the main goals?
- What kind of data is processed?

> Example: A course management system that allows students to register for courses and teachers to manage class rosters.

---

## 2. 🧩 Identified Microservices

List the microservices in your system and their responsibilities.

| Service Name  | Responsibility                                | Tech Stack   |
|---------------|------------------------------------------------|--------------|
| service-a     | Handles user authentication and authorization | Python Flask |
| service-b     | Manages course registration and class data    | Python Flask |
| gateway       | Routes requests to services                   | Nginx / Flask|

---

## 3. 🔄 Service Communication

Describe how your services communicate (e.g., REST APIs, message queue, gRPC).

- Gateway ⇄ service-a (REST)
- Gateway ⇄ service-b (REST)
- Internal: service-a ⇄ service-b (optional)

---

## 4. 🗂️ Data Design

Describe how data is structured and stored in each service.

- service-a: User accounts, credentials
- service-b: Course catalog, registrations

Use diagrams if possible (DB schema, ERD, etc.)

---

## 5. 🔐 Security Considerations

- Use JWT for user sessions
- Validate input on each service
- Role-based access control for APIs

---


## 6. 📦 Deployment Plan

- Use `docker-compose` to manage local environment
- Each service has its own Dockerfile
- Environment config stored in `.env` file

---

## 7. 🎨 Architecture Diagram

> *(You can add an image or ASCII diagram below)*

```
+---------+        +--------------+
| Gateway | <----> | Service A    |
|         | <----> | Auth Service |
+---------+        +--------------+
       |                ^
       v                |
+--------------+   +------------------+
| Service B    |   | Database / Redis |
| Course Mgmt  |   +------------------+
+--------------+
```

---

## ✅ Summary

Summarize why this architecture is suitable for your use case, how it scales, and how it supports independent development and deployment.



## Author

This template was created by Hung Dang.
- Email: hungdn@ptit.edu.vn
- GitHub: hungdn1701


Good luck! 💪🚀

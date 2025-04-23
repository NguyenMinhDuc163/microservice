FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8005

# Thêm dòng sau để chạy migrations trước
CMD ["sh", "-c", "npm run migrate && npm start"]
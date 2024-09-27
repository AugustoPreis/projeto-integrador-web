# Build do backend
FROM node:20-alpine AS build-backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Build do frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

#Build final
FROM node:20-alpine AS build-final
WORKDIR /app
COPY --from=build-backend /app/backend/build /app
COPY --from=build-backend /app/backend/*.env /app
WORKDIR /app
RUN npm install --only=production

CMD ["node", "/app/src/server.js"]
# Multi-stage build for Mini CRM
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install --prefix server && npm install --prefix client

# Copy source code
COPY . .

# Build React app
RUN npm run build --prefix client

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy server code and dependencies
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server/server.js"]

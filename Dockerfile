# === Build Stage ===
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# === Production Stage ===
FROM node:20-alpine
WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy only the build output
COPY --from=build /app/build ./build

EXPOSE 3000

# Serve the build with SPA fallback
CMD ["serve", "-s", "build", "-l", "3000"]

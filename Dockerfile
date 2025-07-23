FROM node:20-alpine

WORKDIR /app

# Install deps and build app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install a static file server for Node
RUN npm install -g serve

# Expose the port serve uses
EXPOSE 3000

# Serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]

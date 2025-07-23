FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Not needed for static site, but commonly here:
# CMD ["serve", "-s", "build", "-l", "3000"]

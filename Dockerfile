# Build AdonisJS
FROM node:16-alpine
# Set directory for all files
WORKDIR /home/node/app
# Copy over package.json files
COPY package*.json ./

COPY .env.example .env
# Install all packages
RUN npm install

EXPOSE 3000

COPY . .
# Build AdonisJS for production
CMD npm run dev

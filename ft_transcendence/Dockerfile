# Use latest Node 24 LTS
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install dependencies
# this will copy package.json and package-lock.json
COPY package*. ./


RUN npm install

# Copy all project files
COPY . .

# Expose dev server port
EXPOSE 3000

# Start Next.js in development mode
CMD npm run dev

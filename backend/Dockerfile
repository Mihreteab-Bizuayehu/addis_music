# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install dependencies (including dev)
RUN npm install

# Copy entire source code
COPY . .

# Expose the server port
EXPOSE 5000

# Run TypeScript with nodemon
CMD ["npm", "run", "dev"]

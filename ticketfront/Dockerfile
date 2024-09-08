# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js application
RUN npm run build

# Serve the application with a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]

# Expose the port the app runs on
EXPOSE 5000

# Use the official Node.js image as the base image
FROM node:24-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular application
RUN npm run build

# Use Nginx to serve the Angular application
FROM nginx:alpine

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/identiworld/browser /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


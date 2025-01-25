# Use the Node.js image with version 20.12.0
FROM node:20.12.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Add ARG for API base URL
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# Copy the rest of the frontend files
COPY . .

# Build the React app with the API base URL
RUN npm run build

# Use the Nginx image to serve the built files
FROM nginx:alpine

# Copy the built frontend files to the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the frontend (HTTP)
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]

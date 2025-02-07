# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install global dependencies
RUN npm install -g serve

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application files
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app will run on
EXPOSE 5000

# Command to serve the React app
CMD ["serve", "-s", "build"]

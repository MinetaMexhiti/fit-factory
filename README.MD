# Fit Factory Web Store Application

## Project Overview

Fit Factory is a web store application built with Node.js for the backend and React for the frontend. The application allows users to browse, filter, and purchase fitness apparel. It includes secure user authentication, role-based access control for admins, and integrates payment processing. The backend and frontend are deployed using Kubernetes, and the application is designed to scale efficiently with different environments.

## Features

- **Product Management**: Admins can add, update, and delete products.
- **Search and Filter**: Users can search for products by name, filter by price, category, and brand.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Shopping Cart**: Users can add, remove, and update products in their cart.
- **Payment Integration**: Payment processing integrated with PayPal/Stripe (optional).
- **Deployment**: The application is deployed using Kubernetes in development, staging, and production environments.

## Technologies

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: AWS EC2, AWS RDS (for database)
- **APIs**: RESTful APIs with CRUD operations
- **Version Control**: Git, GitHub

## Installation

### Prerequisites

- Docker
- Kubernetes
- Node.js (v16 or higher)
- NPM (v8 or higher)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/WSA.A1.git
   cd WSA.A1

   ```

2. Navigate to the backend folder:
   cd server
3. Install the backend dependencies:
   npm install
4. Set up your .env file in the server folder:
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=new_password
   DB_NAME=fit_factory
   JWT_SECRET=your_secret_key_here
5. Start the backend server:
   npm start

### Frontend Setup

1. Navigate to the frontend folder:
   cd client
2. Install the frontend dependencies:
   npm install
3. Start the React development server:
   npm start

### Kubernetes Deployment

kubectl get pods --all-namespaces
kubectl get services --all-namespaces
kubectl proxy

http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/

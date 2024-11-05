# API Documentation for Fit Factory Web Store

## Base URL

`http://localhost:3000/api`

## Authentication

### User Registration

- **Endpoint:** `POST /users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **201 Created:** User registered successfully.
    ```json
    {
      "message": "User registered successfully!"
    }
    ```
  - **400 Bad Request:** If username already exists or password is less than 6 characters.
    ```json
    {
      "error": "Username already exists."
    }
    ```

### User Login

- **Endpoint:** `POST /users/login`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Login successful, returns a token.
    ```json
    {
      "token": "JWT_TOKEN"
    }
    ```
  - **401 Unauthorized:** If the user is not found or password is incorrect.
    ```json
    {
      "error": "User not found"
    }
    ```

## Product Management

### Get All Products

- **Endpoint:** `GET /products`
- **Description:** Retrieves a list of all products.
- **Response:**
  - **200 OK:** List of products.
    ```json
    [
      {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "number",
        "discount": "number",
        "gender": "string",
        "quantity": "integer",
        "category_id": "integer",
        "brand_id": "integer",
        "color_id": "integer",
        "size_id": "integer"
      }
    ]
    ```

### Get Product by ID

- **Endpoint:** `GET /products/:id`
- **Description:** Retrieves a single product by its ID.
- **Response:**
  - **200 OK:** Product details.
    ```json
    {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "number",
      "discount": "number",
      "gender": "string",
      "quantity": "integer",
      "category_id": "integer",
      "brand_id": "integer",
      "color_id": "integer",
      "size_id": "integer"
    }
    ```
  - **404 Not Found:** If the product does not exist.

### Add New Product

- **Endpoint:** `POST /products`
- **Description:** Adds a new product to the inventory.
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "discount": "number",
    "gender": "string",
    "quantity": "integer",
    "category_id": "integer",
    "brand_id": "integer",
    "color_id": "integer",
    "size_id": "integer"
  }
  ```
- **Response:**
  - **201 Created:** Product added successfully.
    ```json
    {
      "id": "integer",
      "name": "string",
      "description": "string",
      "price": "number",
      "discount": "number",
      "gender": "string",
      "quantity": "integer",
      "category_id": "integer",
      "brand_id": "integer",
      "color_id": "integer",
      "size_id": "integer"
    }
    ```
  - **400 Bad Request:** If required fields are missing.

### Update Product

- **Endpoint:** `PUT /products/:id`
- **Description:** Updates an existing product.
- **Request Body:** Same as the request body for adding a new product.
- **Response:**
  - **200 OK:** Product updated successfully.
  - **404 Not Found:** If the product does not exist.

### Delete Product

- **Endpoint:** `DELETE /products/:id`
- **Description:** Deletes a product by its ID.
- **Response:**
  - **204 No Content:** Product deleted successfully.
  - **404 Not Found:** If the product does not exist.

## Order Management

### Place a New Order

- **Endpoint:** `POST /orders`
- **Description:** Places a new order.
- **Request Body:**
  ```json
  {
    "client_id": "integer",
    "products": [
      {
        "product_id": "integer",
        "quantity": "integer"
      }
    ],
    "shipping_address": "string",
    "billing_address": "string"
  }
  ```
- **Response:**
  - **201 Created:** Order placed successfully.
    ```json
    {
      "message": "Order placed successfully",
      "order": {
        "id": "integer",
        "client_id": "integer",
        "products": [
          /* product details */
        ],
        "total_price": "number",
        "status": "string",
        "shipping_address": "string",
        "billing_address": "string"
      }
    }
    ```
  - **400 Bad Request:** If required fields are missing.
  - **404 Not Found:** If a product in the order does not exist.

## Error Handling

- All responses with errors will include an error message in the format:

```json
{
  "error": "Error message"
}
```

//Loads environment variables from the .env file into process.env 

require('dotenv').config({ path: '../.env' }); 
console.log('JWT_SECRET:', process.env.JWT_SECRET);  
console.log('Loaded Environment Variables:', process.env);  

const express = require('express');
const cors = require('cors');
const { authenticateToken } = require('./middleware/authmiddleware');
const db = require('./db'); 
const path = require('path');
const rateLimit = require('express-rate-limit'); // express-rate-limit  middleware to limit the number of requests

const app = express();

console.log(process.env); 

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));


//generate the API documentation from Swagger annotations // UI serves the Swagger documentation as a web page
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//import
const cartRoutes = require('./routes/cartRoutes');
const productRoutesV1 = require('./routes/productRoutesV1'); 
const productRoutesV2 = require('./routes/productRoutesV2'); 
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const PORT = process.env.PORT || 3000;

//swagger configs 
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Fit Factory API',
      description: 'API documentation for the Fit Factory clothing store',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(express.json());
//This enables CORS for requests coming
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'client', 'build')));



//define routes 
app.use('/api/v1/products', productRoutesV1); 
app.use('/api/v2/products', productRoutesV2); 

app.use('/api/users', userRoutes);
app.use('/api/orders', authenticateToken, orderRoutes);
app.use('/api/cart', authenticateToken, cartRoutes);


//http://localhost:PORT/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//connect to db 
db.getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    connection.release(); 
  })
  .catch((err) => {
    console.error('Error connecting to the MySQL database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const express = require('express');
const authMiddleware = require('./middleware/authmiddleware');
const db = require('./db'); 
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/orders', authMiddleware, orderRoutes); // Applying authMiddleware 
app.use(authMiddleware); // Ensuring that authMiddleware is applied after necessary routes
app.use('/api/products', productRoutes);



// Connecting to the database (using the pool)
db.getConnection()
    .then(connection => {
        console.log('Connected to the MySQL database.');

        // To start the server only after the DB connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Graceful shutdown 
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});

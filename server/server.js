const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define the port

const yaml = require('js-yaml');
const fs = require('fs');

// Load your Swagger YAML file
const swaggerFile = 'D:/pasinduJayalal/openapi.yaml';

const swaggerYaml = yaml.load(fs.readFileSync(swaggerFile, 'utf8'));

// Middleware to parse JSON requests
app.use(express.json());

// Serve the Swagger UI
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

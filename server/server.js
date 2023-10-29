const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Data storage (In-memory for demonstration purposes)
const petStore = {};

// Define the POST /pet route
app.post('/pet', (req, res) => {
    
    const newPet = req.body; 
    
    // Replace the logic below with your code to save the new pet to your database or data store.
    const petId = 10;
    
    // Add the new pet to the petStore or database.
    petStore[petId] = newPet;
    
    // Respond with the new pet's details or any other response that's appropriate.
    res.json({
        message: 'Pet added successfully',
        pet: newPet,
    });
});
// Define the GET /pet/findByStatus route
app.get('/pet/findByStatus', (req, res) => {
    // Retrieve the status parameter from the query string.
    const { status } = req.query;
    
    // Check if the 'status' parameter is provided and valid.
    if (status === 'available' || status === 'pending' || status === 'sold') {
       
        res.json([
            {
                id: 10,
                name: 'doggie',
                category: {
                    id: 1,
                    name: 'Dogs',
                },
                photoUrls: ['string'],
                tags: [
                    {
                        id: 0,
                        name: 'string',
                    },
                ],
                status: 'available',
            },
        ]);
    } else {
        // Respond with a 400 Bad Request for an invalid status value.
        res.status(400).json({ message: 'Invalid status value' });
    }
});

// Define the GET /pet/findByTags route
app.get('/pet/findByTags', (req, res) => {
    // Retrieve the 'tags' parameter from the query string.
    const { tags } = req.query;

    // Check if the 'tags' parameter is provided and not empty.
    if (tags && tags.length > 0) {
        // Split the 'tags' parameter into an array of individual tags using comma as the delimiter.
        const tagArray = tags.split(',');
        res.json([
            {
                id: 10,
                name: 'doggie',
                category: {
                    id: 1,
                    name: 'Dogs',
                },
                photoUrls: ['string'],
                tags: [
                    {
                        id: 0,
                        name: 'string',
                    },
                ],
                status: 'available',
            },
        ]);
    } else {
        // Respond with a 400 Bad Request for an empty 'tags' parameter.
        res.status(400).json({ message: 'Invalid tag value' });
    }
});

// Define the GET /pet/{petId} route
app.get('/pet/:petId', (req, res) => {
    // Retrieve the 'petId' parameter from the path.
    const petId = req.params.petId;

    if (petStore[petId]) {
        res.json(petStore[petId]);
    } else {
        // If the pet with the given ID is not found, respond with a 404 Not Found status.
        res.status(404).json({ message: 'Pet not found' });
    }
});

// Define the DELETE /pet/{petId} route
app.delete('/pet/:petId', (req, res) => {
    // Retrieve the 'petId' parameter from the path.
    const petId = req.params.petId;

    // Implement your logic to delete the pet by its ID. Here, we'll use an example in-memory storage.
    if (petStore[petId]) {
        delete petStore[petId];
        res.status(204).send();
    } else {
        // If the pet with the given ID is not found, respond with a 404 Not Found status.
        res.status(404).json({ message: 'Pet not found' });
    }
});

// Define the GET /store/inventory route
app.get('/store/inventory', (req, res) => {
    // Implement your logic to calculate and return a map of status codes to quantities.
    const inventory = calculateInventory(); // Implement the 'calculateInventory' function as needed.
    
    // Send the response with the inventory data.
    res.status(200).json(inventory);
});

// Implement a function to calculate the inventory (replace with your own logic)
function calculateInventory() {
    // Example: Calculate inventory from the 'petStore' data store.
    const inventory = {
        available: 0,
        pending: 0,
        sold: 0,
    };

    for (const petId in petStore) {
        const pet = petStore[petId];
        if (pet.status === 'available') {
            inventory.available++;
        } else if (pet.status === 'pending') {
            inventory.pending++;
        } else if (pet.status === 'sold') {
            inventory.sold++;
        }
    }

    return inventory;
}
// Define the PUT /pet route
app.put('/pet', (req, res) => {
    // Extract the pet data from the request body
    const updatedPet = req.body;

    // Check if the pet with the given ID exists
    if (!updatedPet || !updatedPet.id) {
        return res.status(400).json({ message: 'Invalid ID supplied' });
    }

    // Perform the logic to update the pet in the store based on the ID

    const petId = updatedPet.id;
    if (petStore[petId]) {
        petStore[petId] = updatedPet;
        return res.status(200).json(updatedPet); // Successful operation
    } else {
        return res.status(404).json({ message: 'Pet not found' }); // Pet not found
    }
});

// Implement a DELETE route for deleting a pet by ID
app.delete('/pet/:petId', (req, res) => {
    // Extract the pet ID from the request parameters
    const petId = req.params.petId;

    // Check if the pet with the given ID exists
    if (!petStore[petId]) {
        return res.status(404).json({ message: 'Pet not found' }); // Pet not found
    }

    // Perform the logic to delete the pet based on the ID

    delete petStore[petId];
    return res.status(200).json({ message: 'Pet deleted' }); // Successful operation
});

// Swagger UI setup
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API',
        version: '1.0.0',
        description: 'API documentation for your application',
    },
    servers: [
        {
            url: `http://localhost:${port}`,
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['D:/pasinduJayalal/openapi.yaml'], 
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

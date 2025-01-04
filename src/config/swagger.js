import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce API",
            version: "1.0.0",
            description: "API documentation for Ecommerce platform",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/features/users/users.routes.js", "./src/features/products/products.routes.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;

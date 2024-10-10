// Imports
import express, { Application, Request, Response } from "express";
import categoryRoutes from './routes/category';
import dotenv from "dotenv";

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 3001;
const app: Application = express();

// Adding extra functionality
app.use('/api/v1/category', categoryRoutes);

// Routes
app.get("/ping", async (_req: Request, res: Response) => {
    res.send({
        message: "hello from Una",
    });
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
});
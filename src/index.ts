// Imports
import express, { Application, Request, Response } from "express";
import categoryRoutes from './routes/category';
import userRoutes from './routes/user';
import dotenv from "dotenv";

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 3001;
const app: Application = express();

// Adding functionality
app.use(express.json());
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/user', userRoutes)

// Routes
app.get("/test", async (_req: Request, res: Response) => {
    res.send({
        message: "Hello World!",
    });
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on port  --", PORT);
});
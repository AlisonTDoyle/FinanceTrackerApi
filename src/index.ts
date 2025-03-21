// Imports
import express, { Application, Request, Response } from "express";
import userRoutes from './routes/user';
import transactionRoutes from './routes/transaction';
import budgetRoutes from './routes/budget';
import categoryRoutes from './routes/category';
import dotenv from "dotenv";
import cors from "cors";

// Enable environment variables
dotenv.config();

// Express server setup
const PORT = process.env.PORT || 10001;
const app: Application = express();

// Adding functionality
app.use(cors());
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/transaction', transactionRoutes);
app.use('/api/v1/budget', budgetRoutes);
app.use('/api/v1/category', categoryRoutes);

// Routes
app.get("/test", async (_req: Request, res: Response) => {
    res.send({
        message: "Hello World!",
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
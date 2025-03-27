import Joi from "joi";
import { Category } from "./category";

export interface Transaction {
    id:string;
    user:string;
    name:string;
    description:string;
    category?:Category;
    date:Date;
    price:number;
}

export const ValidateTransaction = (transaction:Transaction) => {
    const transactionSchema = Joi.object<Transaction>({
        // user: Joi.string().hex().length(24),
        name: Joi.string().min(3).required(),
        category: Joi.any(),
        description: Joi.string().min(0).max(150),
        date: Joi.date().required(),
        price: Joi.number().min(0).required(),
        user: Joi.string()
    });

    return transactionSchema.validate(transaction);
}
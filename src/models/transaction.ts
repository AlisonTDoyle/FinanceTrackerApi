import Joi from "joi";
import { Categories } from "../enums/categories";

export interface Transaction {
    id:string;
    user:string;
    name:string;
    description:string;
    category?:Categories;
    date:Date;
    price:number;
    type:TransactionType;
}

export enum TransactionType {
    outgoing,
    incomming
}

export const ValidateTransaction = (transaction:Transaction) => {
    const transactionSchema = Joi.object<Transaction>({
        // user: Joi.string().hex().length(24),
        name: Joi.string().min(3).required(),
        description: Joi.string().min(0).max(150),
        category: Joi.string(),
        date: Joi.date().required(),
        price: Joi.number().min(0).required(),
        type: Joi.string().min(2).required(),
        user: Joi.string()
    });

    return transactionSchema.validate(transaction);
}
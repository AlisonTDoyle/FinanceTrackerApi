import Joi from "joi";

export interface Transaction {
    id:string;
    user:string;
    name:string;
    description:string;
    category?:string;
    date:Date;
    price:number;
    type:string;
}

export const ValidateTransaction = (transaction:Transaction) => {
    const transactionSchema = Joi.object<Transaction>({
        user: Joi.string().hex().length(24).required,
        name: Joi.string().min(3).required(),
        category: Joi.string().hex().length(24),
        price: Joi.number().min(0).required(),
    });

    return transactionSchema.validate(transaction);
}
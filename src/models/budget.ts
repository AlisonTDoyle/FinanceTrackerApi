import Joi from "joi";
import { Allocation } from "./allocation";

export interface Budget {
    id:string;
    user:string;
    total:number;
    allocations:Allocation[];
    start_date:Date;
    end_date:Date;
}

export const ValidateBudget = (budget:Budget) => {
    const budgetSchema = Joi.object<Budget>({
        user: Joi.string(),
        // total: Joi.number().required(),
        allocations: Joi.any(),
        start_date: Joi.date(),
        end_date: Joi.date()
    });

    return budgetSchema.validate(budget);
}
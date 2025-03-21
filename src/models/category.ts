import Joi from "joi";

export interface Category {
    _id?:string;
    user:string;
    name:string;
}

export const ValidateCategory = (category:Category) => {
    const categorySchema = Joi.object<Category>({
        user: Joi.string().required(),
        name: Joi.string().min(3).required()
    });

    return categorySchema.validate(category);
}
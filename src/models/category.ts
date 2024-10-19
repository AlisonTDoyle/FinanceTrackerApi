import Joi from "joi";

export interface Category {
    id:string;
    name:string;
    color:string;
    user:string;
}

/*
    Planned colors for categories:
    - Red
    - Blue
    - Yellow
    - Purple
    - Green
    - Orange
*/

export const ValidateCategory = (category:Category) => {
    const categorySchema = Joi.object<Category>({
        name: Joi.string().min(3).max(50).required(),
        color: Joi.string().min(3).max(10).required(),
        user: Joi.string().hex().length(24).required()
    });

    return categorySchema.validate(category);
}
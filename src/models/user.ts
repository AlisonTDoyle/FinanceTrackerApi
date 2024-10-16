import Joi from "joi";

export interface User {
    id:string;
    username:string;
}

export const ValidateUser = (user:User) => {
    const userSchema = Joi.object<User>({
        username: Joi.string().min(3).max(20).required()
    });

    return userSchema.validate(user);
}
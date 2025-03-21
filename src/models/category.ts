import Joi from "joi";

export interface Category {
    _id?:string;
    user:string;
    name:string;
}
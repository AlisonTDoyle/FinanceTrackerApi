export interface Transaction {
    id:string;
    user:string;
    name:string;
    description:string;
    category:string;
    date:Date;
    price:number;
    type:string;
}
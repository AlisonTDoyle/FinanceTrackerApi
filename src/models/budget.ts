import { Allocation } from "./allocation";

export interface Budget {
    id:string;
    user:string;
    total:number;
    allocations:Allocation[];
    start_date:Date;
    end_date:Date;
}